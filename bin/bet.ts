require('dotenv').config();

import * as models from '../models';
import * as bets from '../lib/bet';

var program = require("commander");


program
  .command('createproposal <account_id> <sports_feed_id> <amount> <message>')
  .action(async (account_id, sports_feed_id, amount, message) => {

    let propsal = await bets.createProposal( account_id, sports_feed_id, amount, message )

    process.exit();
 
  });

program
  .command('acceptproposal <proposal_id> <account_id>')
  .action(async (proposal_id, account_id) => {

    let propsal = await bets.acceptProposal(proposal_id, account_id )

    process.exit();
 
  });



program.parse(process.argv);

