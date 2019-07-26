#!/usr/bin/env ts-node

let BITBOX = require('bitbox-sdk').BITBOX;
let bitbox = new BITBOX();

const jeton = require('jeton-lib')
const PrivateKey = jeton.PrivateKey
const PublicKey = jeton.PublicKey
const Signature = jeton.Signature
const OutputScript = jeton.escrow.OutputScript
const Transaction = jeton.Transaction
import {getEscrowUTXOS} from '../lib/bet';


( async ()=>{

 const priv1 = new PrivateKey('35e2d4091a3550fedb67fd36c1bb364706479e00ab63074d733589ed98f66769')
 const pub1 = priv1.toPublicKey()
 const priv2 = new PrivateKey('90c7dabf3210095eac5c0e615c3ed32f17f918fab4e47b0434f63de3a6534c06')
 const pub2 = priv2.toPublicKey()

 const refPriv = new PrivateKey('c65a751598ddf2cb2b8981d1790f8aa3efc0fe43f2c8e56b64a1684f200c92ec')
 const refpk = refPriv.toPublicKey()

 var outputScriptData = { 
    refereePubKey: refpk,
    parties: [
        {message: 'player1wins', pubKey: pub1},
        {message: 'player2wins', pubKey: pub2}
    ]   
 }

  var sighash = Signature.SIGHASH_ALL | Signature.SIGHASH_FORKID 
  var utxo2 = new Transaction.UnspentOutput({
    txid: 'e96246388762b62ccf5124d89b4891c93f8e5da22c3d67a68f5e1023194e522a',
    vout: 0,
    satoshis: 1638,
    scriptPubKey: 'a914c91ed7cf3c8eb9af229e71ac808b7429a1c4442d87'
  })
 
  var utxo1 = new Transaction.UnspentOutput({
    txid: '1e7446846a3a9d6681e98b3d15dce891834caa7be3fb0b94ca4fce8cd5b0f23a',
    vout: 0,
    satoshis: 1638,
    scriptPubKey: 'a914c91ed7cf3c8eb9af229e71ac808b7429a1c4442d87'
  })

  let outScript = new OutputScript(outputScriptData)

  console.log(outScript.toAddress().toString())

  // Satoshi's to spend minus 750 for miner fee (just to be safe) 
   var amountToSpend = utxo2.satoshis - 750

  var spendTx = new Transaction().from(utxo2).to("bitcoincash:qr4j5jhmwew4kh8qgkh76f5s6rwgl9qf7ugua7cxj3", amountToSpend)

  var refereeSig = Signature.signCDS(outputScriptData.parties[0].message, refPriv)

  spendTx.signEscrow(0, priv1, outputScriptData.parties[0].message, refereeSig, outScript.toScript(), sighash)


  console.log(spendTx.toObject())
  console.log('estimated size', spendTx._estimateSize())
  console.log('verify tx full sig', spendTx.verify())
  console.log('jeton signature verified?', spendTx.verifyScriptSig(0))

  try{

    console.log(spendTx.toString())
    let tx = await bitbox.RawTransactions.sendRawTransaction(spendTx.toString())

    console.log('tx', tx)
 
  }catch(error){
  
    console.log(error)
  
  }
})()

