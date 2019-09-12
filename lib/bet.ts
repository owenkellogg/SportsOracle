require('dotenv').config()
const http = require('superagent')
import * as models from '../models';
import * as database from './database'
const moment = require('moment')
const jeton = require('jeton-lib')
const PrivateKey = jeton.PrivateKey
const PublicKey = jeton.PublicKey
const Signature = jeton.Signature
const OutputScript = jeton.escrow.OutputScript
const Transaction = jeton.Transaction

let BITBOX = require('bitbox-sdk').BITBOX;
let bitbox = new BITBOX();


export async function createProposal(gameId, pubKey,  amount, message){

  let proposal = await models.Proposal.create({
    public_key: pubKey,
    accepted: false,
    amount: amount, 
    matchupId: gameId,
    winning_message: message
  })

 console.log('proposal created', proposal.toJSON())
 return proposal 

}


export async function acceptProposal(proposal_id, pubKey){
  
  let proposal = await models.Proposal.findOne({where:{id:proposal_id}})

  let awayKey = pubKey

  let homeKey = proposal.public_key

  if( proposal.winning_message === 'away'){
    awayKey = proposal.public_key
    homeKey = pubKey
  }
  let bet = await createBet(proposal.matchupId,homeKey,awayKey, process.env.PUBLIC_KEY, proposal.amount)

  proposal.accepted = true

  await proposal.save()

  console.log("proposal accepted", proposal.toJSON())

  return bet


}


export async function createBet(matchupId, homePubKey, awayPubKey, refPubKey, amount){  

  
  // Create the output script
  var ref_pk = new PublicKey(refPubKey)
  var home_pk = new PublicKey(homePubKey)
  var away_pk = new PublicKey(awayPubKey)

  var outputScriptData = {
    refereePubKey: ref_pk,
    parties: [
        {message: `game_id=${matchupId}-winning_team=HOME`, pubKey: home_pk},
        {message: `game_id=${matchupId}-winning_team=AWAY`, pubKey: away_pk}
    ]
  }
  let outScript = new OutputScript(outputScriptData)

  let escrow_address = outScript.toAddress().toString()

  let home_funding_address = await createFundingAddress(amount, escrow_address)

  let away_funding_address = await createFundingAddress(amount, escrow_address)

  console.log(outScript.toScript())

  let bet = await models.Bet.create({
  
    matchupId: matchupId,
    home_team_key: homePubKey,
    away_team_key: awayPubKey,
    oracle_public_key: refPubKey,
    bet_amount_usd: amount,
    bet_amount_bch: home_funding_address.amount,  
    home_winning_message: `game_id=${matchupId}-winning_team=HOME`,
    away_winning_message: `game_id=${matchupId}-winning_team=AWAY`,
    escrow_address: escrow_address.toString(),
    state: "unfunded",
    home_funding_address: home_funding_address.address,
    home_funding_invoice_uid: home_funding_address.uid,
    away_funding_invoice_uid: away_funding_address.uid,
    outScript: outScript.toString(),
    away_funding_address: away_funding_address.address

  })
 
  console.log("bet created", bet.toJSON())
  return bet.toJSON() 

}

export function createKeyPair(){

  const privKey = new PrivateKey();
 
  const pubKey = privKey.toPublicKey()

  return {
    "private_key":privKey.toString(),
    "public_key": privKey.toPublicKey().toString()
  }

}

export async function createFundingAddress(amount, escrowAddress){

  try{ 

    console.log(escrowAddress)
    await http.put('https://api.anypay.global/addresses/BCH')
      .send({
        "address": escrowAddress,
        "currency": "BCH"
      })
      .auth(process.env.ANYPAY_ACCESS_TOKEN)
 
    let invoice = await http.post('https://api.anypay.global/invoices')
      .send({
        "amount": amount,
        "currency": "BCH"
      })
      .auth(process.env.ANYPAY_ACCESS_TOKEN)

    return invoice.body

  }catch(error){
    console.log(error)
  }

}

export async function updateAllEscrowStatus(){

  try{

    let query = `SELECT * FROM bets where state != 'funded' `

    let result = (await database.query(query))[0]

    for( let i = 0; i<result.length; i++){

      let state = await updateEscrowStatus(result[i].id)

    }
 
  }catch(error){

    console.log(error)

  }



}


export async function updateEscrowStatus(betID){

  try{ 
    console.log('betId',betID)
    let bet = await models.Bet.findOne({where:{id:betID}})
        
    let home_state = (await http.get(`https://api.anypay.global/invoices/${bet.home_funding_invoice_uid}`)).body
    let away_state = (await http.get(`https://api.anypay.global/invoices/${bet.away_funding_invoice_uid}`)).body

    let state = 'unfunded'

    let home_funded = (home_state.status === 'paid' || home_state.status === 'overpaid')  

    let away_funded = (away_state.status === 'paid' || away_state.status === 'overpaid')  

    if( home_funded && away_funded ){
      state = 'funded'
    }else if(home_funded && !away_funded){
      state = 'partially_funded_home'
    }else if(!home_funded && away_funded){
      state = 'partially_funded_away'
    }
  
    console.log('new state', state)
    bet.state = state

    await bet.save()

    return bet.toJSON()
 
  }catch(error){
    console.log(error)
    return error
  }
}

export async function getEscrowUTXOS(address){

  //get all unspent utxos from address 
        //
        //
        //
  try {
    let utxos = []
    let transactions = await bitbox.Address.utxo(address);

    console.log('transactions-- ', transactions)
    for( let i = 0; i< transactions.utxos.length; i++){

      let vout = transactions.utxos[i].vout
      
      let details =  await bitbox.Transaction.details(transactions.utxos[i].txid)

      let utxo = {
        "txid": details.txid,
        "vout": vout,
        "satoshis": transactions.utxos[i].satoshis,
        "scriptPubKey": details.vout[vout].scriptPubKey.hex
      }
   
      utxos.push(utxo)

    }

    return utxos

  } catch(error) {
   console.error(error)
  }

}

export async function spendEscrow(winnerAddress, winner_priv, bet_id ){

 try{

   let bet = await models.Bet.findOne({where:{id:bet_id}})
   let game = await models.Game.findOne({where:{matchupId:bet.matchupId}})
   let sighash = (Signature.SIGHASH_ALL | Signature.SIGHASH_FORKID)
        
   console.log()

    // Create the output script
    let  ref_pk = new PublicKey(bet.oracle_public_key)
    let  home_pk = new PublicKey(bet.home_team_key)
    let  away_pk = new PublicKey(bet.away_team_key)

    let outputScriptData = {
      refereePubKey: ref_pk,
      parties: [
        {message: `game_id=${bet.matchupId}-winning_team=HOME`, pubKey: home_pk},
        {message: `game_id=${bet.matchupId}-winning_team=AWAY`, pubKey: away_pk}
      ]
    }

   let outScript = new OutputScript(outputScriptData)

   let spendTxs = []

   let utxos = await getEscrowUTXOS(bet.escrow_address)  

   for( let i=0; i<utxos.length;i++){

     let amountToSpend = utxos[i].satoshis - 750


     let spendTx = new Transaction()
       .from(utxos[i]) // then another transaction for utxo2
       .to(winnerAddress, amountToSpend)


     let refereeSig = Signature.fromString(game.signature)

     let winnerPriv = new PrivateKey(winner_priv)

     spendTx.signEscrow(0, winnerPriv , game.message, refereeSig, outScript.toScript(), sighash)



     spendTxs.push(spendTx.toString())
  
     let tx = await bitbox.RawTransactions.sendRawTransaction(spendTx.toString())

     console.log(tx)
   }

   console.log(spendTxs)
 
   return spendTxs

 }catch(err){
   console.log(err)
 }
}
