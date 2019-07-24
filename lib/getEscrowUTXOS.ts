#!/usr/bin/env ts-node

import {getEscrowUTXOS} from './bet'

(async function(){

 let utxos = await getEscrowUTXOS(process.argv[2]);

 console.log(utxos)
 
})() 
