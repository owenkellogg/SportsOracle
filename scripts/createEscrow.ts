#!/usr/bin/env ts-node

let BITBOX = require('bitbox-sdk').BITBOX;
let bitbox = new BITBOX();

const jeton = require('jeton-lib')
const PrivateKey = jeton.PrivateKey
const PublicKey = jeton.PublicKey
const Signature = jeton.Signature
const OutputScript = jeton.escrow.OutputScript
const Transaction = jeton.Transaction
import {createBet, createKeyPair} from '../lib/bet';


( async ()=>{

  let home_team = createKeyPair();

  let away_team = createKeyPair()

  let ref = createKeyPair()

  console.log({
    "home_private": home_team.Private_Key,
    "home_public": home_team.Public_Key,
    "away_private": away_team.Private_Key,
    "away_public": away_team.Public_Key,
    "ref_public": ref.Public_Key,
    "ref_private": ref.Private_Key

  })

 var outputScriptData = {
    refereePubKey: new PublicKey(ref.Public_Key),
    parties: [
        {message: 'homewin', pubKey: new PublicKey(home_team.Public_Key) },
        {message: 'awaywin', pubKey: new PublicKey(away_team.Public_Key) }
    ]
 }

  let outScript = new OutputScript(outputScriptData)

  console.log(outScript.toAddress().toString())


})()

