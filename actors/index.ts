var CronJob = require('cron').CronJob;

require('dotenv').config()

import {updateDailyGames} from '../lib/index'

new CronJob('0,10,20,30,40,50,55,59 * * * *', function() {

  updateDailyGames(new Date())

}, null, true, 'America/Los_Angeles');


