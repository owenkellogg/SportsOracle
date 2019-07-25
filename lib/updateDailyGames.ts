#!/usr/bin/env ts-node

import {updateDailyGames} from './index';


( async ()=>{

  let d = new Date()

  d.setDate(d.getDate() -  1);

  await updateDailyGames(d)
  
})()
