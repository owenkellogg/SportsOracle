/* implements rabbi actor protocol */

require('dotenv').config();

import { Actor } from 'rabbi';

export async function start() {

  Actor.create({

    exchange: 'sportsoracle',

    routingkey: 'broadcast.bet',

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

