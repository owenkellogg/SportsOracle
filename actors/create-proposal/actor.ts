/* implements rabbi actor protocol */

require('dotenv').config();

import { Actor, log, Joi } from 'rabbi';

import {createProposal} from '../../lib/bet'

export async function start() {

   Actor.create({

    exchange: 'sportsoracle',

    routingkey: 'create.proposal',

    queue: 'create.proposal',

    schema: Joi.object().keys({

      sports_feed_id: Joi.number().integer().required(),

      public_key: Joi.string().required(),

      amount: Joi.number().required(),

      pick: Joi.string().required()

    })

  })
  .start(async (channel, msg, json) => {

    log.info('create proposal', msg.content.toString());


    log.info('message acknowledged', msg.content.toString());

    log.info('json parsed', json);

    await createProposal( json.sports_feed_id, json.public_key, json.amount, json.pick )

    await channel.ack(msg);
  });


}

if (require.main === module) {

  start();

}

