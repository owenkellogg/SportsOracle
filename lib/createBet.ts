#!/usr/bin/env ts-node

import {createBet, createKeyPair} from './index';


( async ()=>{

  let home_team = createKeyPair();

  console.log(home_team.Private_Key)

  let away_team = createKeyPair()

  console.log(away_team.Private_Key)

  let bet = await createBet(1, home_team.Public_Key, away_team.Public_Key, "02815c4fa4e44b406a7baa2af9680ccc2c836b3400f9f5e16c7d12cdd4acc29070", .1)

  console.log(bet.toJSON())
})()

