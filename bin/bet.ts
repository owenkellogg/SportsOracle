require('dotenv').config();

import * as models from '../models';
import * as bets from '../lib/bet';

var program = require("commander");


program
  .command('createproposal <publicKey> <sports_feed_id> <amount> <message>')
  .action(async ( sports_feed_id, amount, message) => {

    let propsal = await bets.createProposal( sports_feed_id, publicKey, amount, message )

    process.exit();
 
  });

//Print QR code
program
  .command('acceptproposal <proposal_id> <publicKey>')
  .action(async (proposal_id, publicKey) => {

    let proposal = await bets.acceptProposal(proposal_id, publicKey )

    console.log("Home funding Invoice:", `https://pos.anypay.global/invoices/${proposal.home_funding_invoice_uid}`)
    
    console.log("Away funding Invoice:", `https://pos.anypay.global/invoices/${proposal.away_funding_invoice_uid}`)

    console.log("bet id:", proposal.id)
          
    process.exit();
 
  });

program
  .command('claimwinnings <bet_id> <winningaddress> <privateKey>')
  .action(async (bet_id, winningaddress, privateKey) => {

    let propsal = await bets.claimWinnings(winningaddress, privateKey, bet_id )

    process.exit();
 
  });


program
  .command('listtodaysgames')
  .action(async ()=>{

    process.exit()
  })


program
  .commant('listbets')
  .action( async ()=>{

    process.exit()
  })


program
  .commant('listproposals')
  .action(async ()=>{

    process.exit()
  })

program.parse(process.argv);

