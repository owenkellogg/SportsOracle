/* implements rabbi actor protocol */

require('dotenv').config();

import {updateDailyGames} from '../../lib/index'

import { Actor, log, Joi } from 'rabbi';

export async function start() {

   Actor.create({

    exchange: 'sportsoracle',

    routingkey: 'update.game',

    queue: 'update.game',

    schema: Joi.object().keys({

      time: Joi.number().integer().required(),

      sport: Joi.string().optional(),

      id: Joi.number().optional()

    })

  })
  .start(async (channel, msg, json) => {

    log.info('update games', msg.content.toString());

    log.info('json parsed', json);

    var time = json.time;

    var sport = json.sport;

    var id = json.id;

    await updateDailyGames( time, sport, id )

    await channel.ack(msg);

    log.info('message acknowledged', msg.content.toString());

  });


}

if (require.main === module) {

  start();

}

