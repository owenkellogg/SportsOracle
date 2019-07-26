#!/usr/bin/env ts-node

import {updateEscrowStatus} from '../lib/index';


( async ()=>{

  let gameId = process.argv[2]
  console.log(gameId)
  let bet = await updateEscrowStatus(gameId)

  console.log(bet)
})()

