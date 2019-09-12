require('dotenv').config()
const http = require('superagent')
import * as models from '../models';
import * as database from './database'
const moment = require('moment')

export async function getTodaysGames(){

  try{

    const query = `SELECT * FROM games where to_char(date, 'yyyy-mm-dd') = to_char(CURRENT_DATE, 'yyyy-mm-dd')`

    let result = (await database.query(query))[0]
    result.date = moment.tz(result.date, "America/New_York").format('MMM Do YYYY hA');
    console.log(result.date)
   return result 

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

export async function getWeeklyMatchups(week, leagueId){

  try{
 
    const query = `SELECT * FROM matchups where "scoringPeriod" = ${week} and "leagueId" = ${leagueId}`

    let matchups = (await database.query(query))[0]

    const query1 = `SELECT * FROM "FantasyFootballTeams" where "leagueId" = ${leagueId};`

    let teams = (await database.query(query1))[0]


    let res = matchups.map((matchup)=>{

      teams.forEach((team)=>{

        if(matchup.homeTeamId === team.teamId){
         
           matchup['homeTeamName'] = team.name
           matchup['homeLogo'] = team.logoURL
           matchup['homeAbbreviation'] = team.abbreviation
        }

        if(matchup.awayTeamId === team.teamId){
          
           matchup['awayTeamName'] = team.name
           matchup['awayLogo'] = team.logoURL
           matchup['awayAbbreviation'] = team.abbreviation
        }

      })

      return matchup
    })

    return matchups 

  }catch(error){    
    console.log(error)
  }

}

export async function getFantasyTeams(leagueId){

  try{
 
    const query = `SELECT * FROM "FantasyFootballTeams" where "leagueId" = ${leagueId};`

    return (await database.query(query))[0]

  }catch(error){    
    console.log(error)
  }


}

export async function getProposals(){

  try{
    const query = `SELECT * FROM bet_proposals where "accepted" = false`
    
    let result = (await database.query(query))[0] 

    for( let i=0; i<result.length;i++){

      if(result[i].winning_message.includes('HOME')){

        result[i].winning_message = 'Away'

      }
      else{

        result[i].winning_message = 'Home'

      }

    }
    console.log(result)
    return result 

  }catch(error){
    console.log(error)
  }


}

export async function getAcceptedBets(){

  const query = `SELECT * FROM bets`

  return (await database.query(query))[0]

}

export async function getProposal(id){

try{

  const query = `SELECT * FROM bet_proposals where id = ${id}`

  let result =   (await database.query(query))[0][0]

  if(result.winning_message.includes('HOME')){

        result.winning_message = 'Away'

  }
  else{

    result.winning_message = 'Home'

  }

  return result

}catch(error){

        console.log(error)

}


}
