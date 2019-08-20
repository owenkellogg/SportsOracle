'use strict';

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const HapiSwagger = require('hapi-swagger');
const Path = require('path');


import * as handler from '../../handlers'

import * as Joi from 'joi';

require('dotenv').config()

if (require.main === module) {

  start();

}


const options = {
  info: {
     title : 'Sports Oracle API Documentation',
     version: '0.0.1',
  }
};



// Start the server
export  async function start() {

  // Create a server with a host and port
  const server=Hapi.server({
    host:'0.0.0.0',
    port:3000,
    routes: {
      cors: true,
      files:{

        relativeTo: Path.join(__dirname, '../sports-app/dist')

      }

    }
  });

  await  server.register({
    Inert,
    plugin: HapiSwagger,
    options: options,
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
  })

  server.route({ 
    method:'GET',
    path:'/api/games/{id}',
	handler: handler.getGame,
  })
        
  server.route({ 
    method:'GET',
    path:'/api/games/today',
	handler: handler.getTodaysGames,
  })

 server.route({ 
    method:'GET',
    path:'/api/games/yesterday',
	handler: handler.getYesterdaysGames,
  })

  server.route({ 
    method:'GET',
    path:'/api/proposals',
	handler: handler.getProposals,
  })

 server.route({ 
    method:'GET',
    path:'/api/proposals/{id}',
	handler: handler.getProposal,
  })

  server.route({ 
    method:'POST',
    path:'/api/proposals',
	handler: handler.createProposal,
    options: {
      tags: ['api'],
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

 //TODO valildate params
  server.route({ 
    method:'POST',
    path:'/api/proposals/{id}',
	handler: handler.acceptProposal,
  })  

 //TODO valildate params
  server.route({ 
    method:'POST',
    path:'/api/claim-winnings',
	handler: handler.claimWinnings,
  })  



//TODO valildate params
  server.route({ 
    method:'GET',
    path:'/api/accepted',
	handler: handler.getAcceptedBets,
  }) 

  await server.register(Inert);

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
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
