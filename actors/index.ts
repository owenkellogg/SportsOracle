var CronJob = require('cron').CronJob;

require('dotenv').config()

import {updateDailyGames} from '../lib/index'

import {updateAllEscrowStatus} from '../lib/bet'

require('./server');

new CronJob('4,10,20,30,40,50,55,59 * * * *', function() {

  updateDailyGames(new Date())

  updateAllEscrowStatus()

}, null, true, 'America/Los_Angeles');




