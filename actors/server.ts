'use strict';

const Hapi=require('hapi');

const Path = require('path');

const Inert = require('inert');

import * as handler from '../handlers'

import * as Joi from 'joi';

require('dotenv').config()

// Start the server
const start =  async function() {



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

  //TODO valildate params
  server.route({ 
    method:'POST',
    path:'/api/proposals',
	handler: handler.createProposal,
  })

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
