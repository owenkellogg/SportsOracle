'use strict';

const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Path = require('path');

import * as handler from '../handlers'

import * as Joi from 'joi';

require('dotenv').config()

// Start the server
const start =  async function() {


  // Create a server with a host and port
  const server= await Hapi.server({
    host:'0.0.0.0',
    port:3000,
    routes: {
      cors: true,
      files:{

        relativeTo: Path.join(__dirname, '../sports-app/dist')

      }

    }
  });
  

  await server.register(require('inert'));
  await server.register(require('vision'));
  await server.register({
    plugin: HapiSwagger,
    options: {
      info: {
        title: 'Sports Oracle Documentation',
        version: '0.0.1',
      },
    }
  })

  server.route({
    method:'GET',
          path:'/api/oracle-key/{id}',
	handler: handler.getOracleKey,
  });


  server.route({ 
    method:'GET',
    path:'/api/games',
	handler: handler.getAllGames,
    options: {
      tags: ['api'],
      notes: 'Returns the returns all of the games from the 2019 MLB season',
      description: 'Get All Games',
    }
  })

  server.route({ 
    method:'GET',
    path:'/api/games/{id}',
	handler: handler.getGame,
    options: {
      tags: ['api'],
      notes: 'Returns the mlb game by ID',
      description: 'Get Game',
      validate: {
        params: {
          id: Joi.number().required().description('ID of MLB game')
        },
      },
    }
  })
                        
  server.route({ 
    method:'GET',
    path:'/api/games/today',
	handler: handler.getTodaysGames,
    options: {
      tags: ['api'],
      notes: 'Returns a list of the MLB games from today',
      description: 'Get Todays Games',
    }

  })

 server.route({ 
    method:'GET',
    path:'/api/games/yesterday',
	handler: handler.getYesterdaysGames,
    options: {
      tags: ['api'],
      notes: 'Returns a list of the MLB games from yesterday',
      description: 'Get Todays Games',
    }
  })

  server.route({ 
    method:'GET',
    path:'/api/proposals',
	handler: handler.getProposals,
    options: {
      tags: ['api'],
      notes: 'Returns a list of open proposals',
      description: 'Get Open Proposals',
    }

  })

 server.route({ 
    method:'GET',
    path:'/api/proposals/{id}',
	handler: handler.getProposal,
  })

  //TODO valildate params
  server.route({ 
    method:'POST',
    path:'/api/proposals',
	handler: handler.createProposal,
    options: {
      tags: ['api'],
      notes: 'Returns the newly created proposal',
      description: 'Create Proposal',
      validate: {
        payload: {
          amount: Joi.number().required().description('Amount for the bet'),
          message: Joi.string().required().description('Unique winning message that contatins the game id and home or away {id}.{pick} e.g. 23332.HOME indicates this proposal is to bet on game 2332 and the home to to win') ,
          public_key: Joi.string().required().description('The proposers public key'),
          sport: Joi.string().required().description('the sport the bet is for'),
          game_id: Joi.number().required().description('unique identifier for the game to bet on')
        },
      },
    }
 });

  server.route({ 
    method:'POST',
    path:'/api/proposals/{id}',
	handler: handler.acceptProposal,
    options: {
      tags: ['api'],
      notes: 'Returns Bet Proposal by Id ',
      description: 'Get Game',
      validate: {
        params: {
          id: Joi.number().required().description('ID of proposal')
        },
        payload: {

          public_key: Joi.string().required().description('Public Key to be used when generating Escrow Address')

        },
      },
    }

  })  

 //TODO valildate params
  server.route({ 
    method:'POST',
    path:'/api/claim-winnings',
	handler: handler.claimWinnings,
    options: {
      validate: {
        payload: {
          private_key: Joi.string().required().description('Private Key of the Public Key used to generate the Escrow Address'),
          id: Joi.number().required().description('Bet ID'),
          winning_address: Joi.string().required().description('Bitcoin Cash address to send the funds to')
        },
      },
      tags: ['api'],
      notes: 'Method to claim winning bet',
      description: 'Claim winnings'
    },

  })  



//TODO valildate params
  server.route({ 
    method:'GET',
    path:'/api/accepted',
	handler: handler.getAcceptedBets,
    options: {
      tags: ['api'],
      notes: 'Return the list of open accepted Bets',
      description: 'Get Accepted Bets',
    }


  }) 

  server.route({
	method: 'GET',
	path: '/{param*}',
	handler: {
	   directory:{
		path: '.',
		redirectToSlash: true,
		index: true,
	   }

	}

  })

    try {
      await server.start();
      console.log('Server running at: ', server.info.uri);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

};

if (require.main === module) {
  start();
}
