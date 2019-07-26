'use strict';

const Hapi=require('hapi');

const Path = require('path');

const Inert = require('inert');

import * as handler from '../handlers'

require('dotenv').config()

const validate = async (request, email, password, h) => {

    if (!email || !password) {
        return { credentials: null, isValid: false };
    }

    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };

    return { isValid, credentials };
};


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

  server.register(require('@hapi/basic')

  server.auth.strategy('simple', 'basic', { validate });



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
