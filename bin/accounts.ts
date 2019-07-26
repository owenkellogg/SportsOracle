#!/usr/bin/env ts-node

require('dotenv').config();

import * as models from '../models';
import * as accounts from '../lib/account';

var program = require("commander");

program
  .command('getaccount <email>')
  .action(async (email) => {

    let account = await models.Account.findOne({ where: { email }});

    if (!account) {

      console.log(`account not found for email ${email}`);

    } else {

      console.log(`account found`, account.toJSON());

    }

    process.exit();
 
  });

program
  .command('createaccount <email> <address> <publickey>')
  .action(async (email, address, public_key) =>{
    let account = await accounts.createAccount(email, address, public_key)

    process.exit()  
  })

program.parse(process.argv);

