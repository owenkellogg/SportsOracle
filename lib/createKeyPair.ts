#!/usr/bin/env ts-node

import {createKeyPair} from './bet'

(async function(){

 let keyPair = await createKeyPair();

 console.log(keyPair)
 
})() 

