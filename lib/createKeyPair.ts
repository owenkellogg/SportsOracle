#!/usr/bin/env ts-node

import {createKeyPair} from './index'

(async function(){

 let keyPair = await createKeyPair();

 console.log(keyPair)
 
})() 

