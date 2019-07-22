#!/usr/bin/env ts-node

import {spendEscrow, getEscrowUTXOS} from './index'

(async function(){

 let utxos = await getEscrowUTXOS(process.argv[2]);

 console.log(utxos)

 let spendScripts = await spendEscrow(utxos, process.env.WINNER_ADDRESS, process.env.SPORTS_FEED_ID, process.env.WINNER_PRIVATE_KEY, 1) 
 console.log(spendScripts)
 
})() 
