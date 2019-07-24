#!/usr/bin/env ts-node

import {createBet, createKeyPair} from './bet';


( async ()=>{

  let home_team = createKeyPair();

  let away_team = createKeyPair()

  let bet = await createBet(48847, home_team.Public_Key, away_team.Public_Key, process.env.PUBLIC_KEY, .1 )
  console.log({
    "home_private": home_team.Private_Key.toString(),
    "home_public": home_team.Private_Key.toString(),
    "away_private": away_team.Private_Key.toString(),
    "away_public": away_team.Private_Key.toString(),
    "oracle_public":process.env.PUBLIC_KEY 
  })
  console.log(bet)
})()

