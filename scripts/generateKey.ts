#!/usr/bin/env ts-node

const jeton = require('jeton-lib')
const bitcoin = require('bitcore-lib-cash')

const PrivateKey = jeton.PrivateKey
const PublicKey = jeton.PublicKey

let key = new PrivateKey()
let publicKey = key.toPublicKey().toString()

console.log('PUBLIC_KEY=', publicKey)
console.log('PRIVATE_KEY=', key.toString())
