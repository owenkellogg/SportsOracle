require('dotenv').config()
const http = require('superagent')
import * as models from './models';
import * as database from './database'

export async function getTodaysGames(){

  try{

    const query = `SELECT * FROM games where to_char(date, 'yyyy-mm-dd') = to_char(CURRENT_DATE, 'yyyy-mm-dd')`

    return (await database.query(query))[0]

  }catch(error){
    console.log(error)
  }


}

export async function getYesterdaysGames(){
        
  try{

    const query = `SELECT * FROM games where to_char(date + interval '1 day', 'yyyy-mm-dd') = to_char(CURRENT_DATE, 'yyyy-mm-dd')
          `
    return (await database.query(query))[0]

  }catch(error){
    console.log(error)
  }


}
