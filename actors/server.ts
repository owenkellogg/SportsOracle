'use strict';

const Hapi=require('hapi');

const Path = require('path');

const Inert = require('inert');

import * as handler from '../handlers'

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

        relativeTo: Path.join(__dirname, '../app/dist')

      }

    }
  });

  server.route({
    method:'GET',
    path:'/oracle-key/{id}',
	handler: handler.getOracleKey,
  });


  server.route({ 
    method:'GET',
    path:'/games',
	handler: handler.getAllGames,
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
