#!/usr/bin/env ts-node

import {getEscrowUTXOS} from '../lib/bet'

(async function(){

 let utxos = await getEscrowUTXOS(process.argv[2]);

 console.log(utxos)
 
})() 
