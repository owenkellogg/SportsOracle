
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

      console.log('scriptPubKey', details.vout[0].scriptPubKey)

      let utxo = {
        "txid": details.txid,
        "vout": 0,
        "satoshis": Math.floor(details.vout[0].value*10000000),
        "scriptPubKey": details.vout[0].scriptPubKey.hex
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
        
   console.log()

    // Create the output script
    let  ref_pk = new PublicKey(bet.oracle_public_key)
    let  home_pk = new PublicKey(bet.home_team_key)
    let  away_pk = new PublicKey(bet.away_team_key)

    let outputScriptData = {
      refereePubKey: ref_pk,
      parties: [
        {message: `game_id=${sports_feed_id}-winning_team=HOME`, pubKey: home_pk},
        {message: `game_id=${sports_feed_id}-winning_team=AWAY`, pubKey: away_pk}
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
  
     let tx = await bitbox.RawTransactions.sendRawTransaction(spendTx.toString())

     console.log(tx)
   }

   console.log(spendTxs)
 
   return spendTxs

 }catch(err){
   console.log(err)
 }
}
