require('dotenv').config();

import * as models from '../models';
import * as bets from '../lib/bet';
import * as api from '../lib/api';

var program = require("commander");


program
  .command('createproposal <publicKey> <sports_feed_id> <amount> <message>')
  .action(async ( publicKey, sports_feed_id, amount, message) => {

    let id = parseInt(sports_feed_id, 10)
    let propsal = await bets.createProposal( id, publicKey, amount, message )

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
  .command('broadcastwinnings <bet_id> <winningaddress> <privateKey>')
  .action(async (bet_id, winningaddress, privateKey) => {

    let propsal = await bets.broadcastWinnings(winningaddress, privateKey, bet_id )

    process.exit();
 
  });

program
  .command('updateAllEscrowStatus')
  .action( async ()=>{

    await bets.updateAllEscrowStatus()

    process.exit()

  });

program
  .command('updateEscrowStatus <betId>')
  .action( async (betId)=>{

   let state = await bets.updateEscrowStatus(betId)

   console.log(state)

   process.exit()

  });

program
  .command('listtodaysgames')
  .action(async ()=>{

    let games = await api.getTodaysGames()

    console.log(games)
    process.exit()
  })


program
  .command('listbets')
  .action( async ()=>{

    let bets = await api.getAcceptedBets()

    console.log(bets)

    process.exit()
  })


program
  .command('listproposals')
  .action(async ()=>{

    let proposals  = await api.getProposals()

    console.log(proposals)

    process.exit()
  })

program.parse(process.argv);

