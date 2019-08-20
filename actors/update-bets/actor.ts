/* implements rabbi actor protocol */

require('dotenv').config();

import { Actor } from 'bunnies';

export async function start() {

  Actor.create({

    exchange: '',

    routingkey: '',

    queue: ''

  })
  .start(async (channel, msg) => {

    console.log(msg.content.toString());

    channel.ack(msg);

  });

}

if (require.main === module) {

  start();

}

