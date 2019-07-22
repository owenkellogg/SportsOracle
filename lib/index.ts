#!/usr/bin/env ts-node
require('dotenv').config()
const http = require('superagent')
import * as models from './models';
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

export async function getAllSeasonMLBGames(){

  try{

    let resp = await http
                        .get('https://api.mysportsfeeds.com/v2.1/pull/mlb/latest/games.json')
                        .auth(process.env.SPORTSFEED_API_KEY, process.env.SPORTSFEED_API_PASSWORD)

    let games = resp.body.games
  
    games.forEach((game)=>{
      
      writeMLBGameToDB(game)

    })                  

    console.log('done')

  }catch(error){
    console.log(error)
  }
}

export async function updateDailyGames(date){

  let day = moment(date).format('YYYYMMDD')

  console.log('updating games for', day)

  try{


    let resp = await http
                  .get(`https://api.mysportsfeeds.com/v2.1/pull/mlb/current/date/${day}/games.json`)
                  .auth(process.env.SPORTSFEED_API_KEY, process.env.SPORTSFEED_API_PASSWORD)

    let games = resp.body.games
    
   
    games.forEach((game)=>{
      
      updateMLBGameToDB(game)

    })                  


  }catch(error){
    console.log(error)
  }



}


async function updateMLBGameToDB(game){

  console.log('update game', game)

  if(game.schedule.playedStatus === 'COMPLETED'){

    console.log('Game Completed')
    
    let record = await models.Game.findOne({where : {sports_feed_id: game.schedule.id}})

    if( record.signature === null ){

      console.log('Signature is null')

      let signature = await signGameResult(game)

      return signature
    }

    return "GAME ALREADY SIGNED"

  }

  return "GAME NOT COMPLETE"

}

async function writeMLBGameToDB(game){

  try{

    let record = await models.Game.create({
          sports_feed_id: game.schedule.id,
          date: moment(game.schedule.startTime).toDate(),
          venue: game.schedule.venue.name,
          home_team: game.schedule.homeTeam.abbreviation,
          away_team: game.schedule.awayTeam.abbreviation,
          home_score: game.score.homeScoreTotal,
          away_score: game.score.awayScoreTotal,
          away_hit_total: game.score.awayHitsTotal,
          home_hit_total: game.score.homeHitsTotal,
          away_error_total: game.score.awayErrorsTotal,
          home_error_total: game.score.homeErrorsTotal
    })

    await signGameResult(game)

    return record

  }catch(error){

    console.log(error)

  }


}

export async function signGameResult(game){

  console.log('sign game result', game)

  let record = await models.Game.findOne({where:{sports_feed_id:game.schedule.id}})

  record.home_score = game.score.homeScoreTotal

  record.away_score = game.score.awayScoreTotal

  record.away_hit_total = game.score.awayHitsTotal

  record.home_hit_total = game.score.homeHitsTotal

  record.away_error_total = game.score.awayErrorsTotal

  record.home_eror_total = game.score.homeErrorsTotal

  let message = ''
  
  if( game.home_score > game.away_score){

    message = `game_id=${game.sports_feed_id}-winning_team=HOME`

  }else if( game.home_score < game.away_score ){

    message = `game_id=${game.sports_feed_id}-winning_team=AWAY`

  }

  record.messgae = message

  const refPriv = new PrivateKey(process.env.PRIVATE_KEY)

  const refereeSig = Signature.signCDS(message, refPriv)

  const signature = refereeSig.toString()

  record.signature = signature

  record.signature_id = 1

  console.log(signature)

  await record.save()

  return signature 

}

export async function getOraclePublicKey(oracleId){

  if(oracleId === '1'){
   
    return process.env.PUBLIC_KEY

  }
  else{
    return "ORACLE_DOES_NOT_EXIST"
  }

}

export async function getAllGames(){

  const query = `SELECT * from games`

  let resp = await database.query(query)

  return resp[0]

}

export async function getGame(sportsFeedId){

 const query = `SELECT * from games where sports_feed_id = ${sportsFeedId}`

 const resp = await database.query(query)

 return resp[0][0]

}

export async function createBet(sports_feed_id, homePubKey, awayPubKey, refPubKey, amount){  

  
  // Create the output script
  var ref_pk = new PublicKey(refPubKey)
  var home_pk = new PublicKey(homePubKey)
  var away_pk = new PublicKey(awayPubKey)

  var outputScriptData = {
    refereePubKey: ref_pk,
    parties: [
        {message: `game_id=${sports_feed_id}-winning_team=HOME`, pubKey: home_pk},
        {message: `game_id=${sports_feed_id}-winning_team=AWAY`, pubKey: away_pk}
    ]
  }
  let outScript = new OutputScript(outputScriptData)

  let escrow_address = outScript.toAddress().toString()

  let home_funding_address = await createFundingAddress(amount, escrow_address)

  let away_funding_address = await createFundingAddress(amount, escrow_address)

  console.log(outScript.toScript())

  let bet = await models.Bet.create({
  
    sports_feed_id: sports_feed_id,
    home_team_key: homePubKey,
    away_team_key: awayPubKey,
    oracle_public_key: refPubKey,
    bet_amount_usd: amount,
    bet_amount_bch: home_funding_address.amount,  
    home_winning_message: `game_id=${sports_feed_id}-winning_team=HOME`,
    away_winning_message: `game_id=${sports_feed_id}-winning_team=AWAY`,
    escrow_address: escrow_address.toString(),
    state: "unfunded",
    home_funding_address: home_funding_address.address,
    home_funding_invoice_uid: home_funding_address.uid,
    away_funding_invoice_uid: away_funding_address.uid,
    outScript: outScript.toString(),
    away_funding_address: away_funding_address.address

  })
 
  return bet.toJSON() 

}

export function createKeyPair(){

  const privKey = new PrivateKey();

  console.log("PrivKey:", privKey.toString())
 
  const pubKey = privKey.toPublicKey()

  console.log("PubKey:", pubKey.toString())
  

  return {
    "Private_Key":privKey.toString(),
    "Public_Key": privKey.toPublicKey().toString()
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

    console.log(invoice.body)
    return invoice.body

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
  try {
    let utxos = []
    let transactions = await bitbox.Address.utxo(address);

    for( let i = 0; i< transactions.utxos.length; i++){
      
      let details =  await bitbox.Transaction.details(transactions.utxos[i].txid)

      let utxo = {
        "txid": details.txid,
        "vout": 0,
        "satoshis": Math.floor(details.vout[0].value*10000000),
        "scriptPubKey": transactions.scriptPubKey
      }
   
      utxos.push(utxo)

    }

    return utxos

  } catch(error) {
   console.error(error)
  }

}

export async function spendEscrow(utxos, winnerAddress, sports_feed_id, winner_priv, bet_id ){

 try{

   let game = await models.Game.findOne({where:{sports_feed_id:sports_feed_id}})
   let bet = await models.Bet.findOne({where:{id:bet_id}})
   let sighash = (Signature.SIGHASH_ALL | Signature.SIGHASH_FORKID)
        
    let outputScriptData = {
      refereePubKey: bet.oracle_public_key,
      parties: [
        {message: `game_id=${sports_feed_id}-winning_team=HOME`, pubKey: bet.home_team_key},
        {message: `game_id=${sports_feed_id}-winning_team=AWAY`, pubKey: bet.away_team_key}
      ]
    }

   let outScript = new OutputScript(outputScriptData)

   let spendTxs = []

   for( let i=0; i<utxos.length;i++){

     let amountToSpend = utxos[i].satoshis - 750


     let spendTx = new Transaction()
       .from(utxos[i]) // then another transaction for utxo2
       .to(winnerAddress, amountToSpend)


     let refereeSig = Signature.fromString(game.signature)

     let winnerPriv = new PrivateKey(winner_priv)

     spendTx.signEscrow(0, winnerPriv , game.message, refereeSig, outScript.toScript(), sighash)

     spendTxs.push(spendTx.toString())
     console.log(spendTx.toString())
  
   }

   console.log(spendTxs)
 
   return spendTxs

 }catch(err){
   console.log(err)
 }
}
