#!/usr/bin/env ts-node
require('dotenv').config()
const http = require('superagent')
import * as models from './models';
import * as database from './database'

const moment = require('moment')
const jeton = require('jeton-lib')
const PrivateKey = jeton.PrivateKey
const PublicKey = jeton.PublicKey
const Signature = jeton.Signature
const OutputScript = jeton.escrow.OutputScript
const Transaction = jeton.Transaction

export async function getAllSeasonMLBGames(){

  try{

    let resp = await http
                        .get('https://api.mysportsfeeds.com/v2.1/pull/mlb/latest/games.json')
                        .auth(process.env.SPORTSFEED_API_KEY, process.env.SPORTSFEED_API_PASSWORD)

    let games = resp.body.games
  
    games.forEach((game)=>{
      
      writeMLBGameToDB(game)

    })                  

    console.log('done')

  }catch(error){
    console.log(error)
  }
}

export async function updateDailyGames(date){

  let day = moment(date).format('YYYYMMDD')

  console.log('updating games for', day)

  try{


    let resp = await http
                  .get(`https://api.mysportsfeeds.com/v2.1/pull/mlb/current/date/${day}/games.json`)
                  .auth(process.env.SPORTSFEED_API_KEY, process.env.SPORTSFEED_API_PASSWORD)

    let games = resp.body.games
    
   
    games.forEach((game)=>{
      
      updateMLBGameToDB(game)

    })                  


  }catch(error){
    console.log(error)
  }



}


async function updateMLBGameToDB(game){

  if(game.schedule.playedStatus === 'COMPLETED'){
    
    let record = await models.Game.findOne({where : {sports_feed_id: game.schedule.id}})

    if( record.signature === null ){
      
      let signature = await signGameResult(record.id, 1)

      return signature
    }

    return "GAME ALREADY SIGNED"

  }

  return "GAME NOT COMPLETE"

}

async function writeMLBGameToDB(game){

  try{

    let record = await models.Game.create({
          sports_feed_id: game.schedule.id,
          date: moment(game.schedule.startTime).toDate(),
          venue: game.schedule.venue.name,
          home_team: game.schedule.homeTeam.abbreviation,
          away_team: game.schedule.awayTeam.abbreviation,
          home_score: game.score.homeScoreTotal,
          away_score: game.score.awayScoreTotal,
          away_hit_total: game.score.awayHitsTotal,
          home_hit_total: game.score.homeHitsTotal,
          away_error_total: game.score.awayErrorsTotal,
          home_error_total: game.score.homeErrorsTotal
    })

    await signGameResult(record.id, 1)

    return record

  }catch(error){

    console.log(error)

  }


}

export async function signGameResult(gameId, sigId){

  let game = await models.Game.findOne({where:{id:gameId}})

  let message = ''
  
  if( game.home_score > game.away_score){

    message = `game_id=${game.id}-winning_team=HOME`

  }else if( game.home_score < game.away_score ){

    message = `game_id=${game.id}-winning_team=AWAY`

  }
  else{
    return 'No winner determined'
  }

  const refPriv = new PrivateKey(process.env.PRIVATE_KEY)

  const refereeSig = Signature.signCDS(message, refPriv)

  const signature = refereeSig.toString()

  game.signature = signature

  game.signature_id = 1

  await game.save()

  console.log(game)

  return signature 

}

export async function getOraclePublicKey(oracleId){

  if(oracleId === '1'){
   
    return process.env.PUBLIC_KEY

  }
  else{
    return "ORACLE_DOES_NOT_EXIST"
  }

}

export async function getAllGames(){

  const query = `SELECT * from games`

  let resp = await database.query(query)

  return resp[0]

}

