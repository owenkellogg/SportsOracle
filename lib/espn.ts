import * as espn from 'espn-fantasy-football-api/node';

require('dotenv').config()

import {FantasyTeam, Matchup} from '../models';

export async function updateLeagueTeams(leagueId, week){

  const  myClient = new espn.Client({ leagueId: leagueId });

  myClient.setCookies({ espnS2: process.env.ESPN_S2, SWID: process.env.SWID });

  const teams = await myClient.getTeamsAtWeek({ seasonId: 2019, scoringPeriodId: week })

  teams.forEach((team) =>{

    team['teamId'] = team.id
    return FantasyTeam
      .findOne({ where:{teamId: team.id }})
      .then(function(obj) {
        if(obj) { // update
          return obj.update(team);
        }
        else { // insert
          return FantasyTeam.create(team);
        }
      })

  })
                
}


export async function updateMatchups(leagueId, week){

  const  myClient = new espn.Client({ leagueId: leagueId });

  myClient.setCookies({ espnS2: process.env.ESPN_S2, SWID: process.env.SWID });

  const matchups = await myClient.getBoxscoreForWeek({ seasonId: 2019, scoringPeriodId: week, matchupPeriodId: week })

  matchups.forEach((matchup) =>{

    matchup['leagueId'] = leagueId
    matchup['scoringPeriod'] = week
    matchup['seasonId'] = 2019
    return Matchup.findOne({ 
      where:{
        scoringPeriod: week,              
        homeTeamId: matchup.homeTeamId,
        awayTeamId: matchup.awayTeamId
     }
    })
      .then(function(obj) {
        if(obj) { // update
          return obj.update(matchup);
        }
        else { // insert
          return Matchup.create(matchup);
        }
      })
  })
                
}

