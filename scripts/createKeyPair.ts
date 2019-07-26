#!/usr/bin/env ts-node

import {createKeyPair} from '../lib/bet'

(async function(){

 let keyPair = await createKeyPair();

 console.log(keyPair)
 
})() 

