# SportsOracle

This repository is an Oracle for MLB baseball data and a library to create escrow transactions on the Bitcoin Cash Blockchain 

1. Player 1 proposes bet 

    ``
    ts-node bin/bet.ts listtodaysgame 
    ts-node bin/bet.ts createproposal <public_key> <sports_feed_id> <amount> <pick (home|away> 

    ``

2. Player 2 accepts bet 

   ``
   //parameters proposal_id player_2_public_key
   ts-node bin/bet.ts acceptproposal <proposal_id> <player_2_public_key>

   ``
 

3. An escrow is created with the public key of, Player 1, Player 2 and the Oracle.

4. Player 1 and Player 2 fund the escrow via an Anypay Invoice

   ``
     Pay Anypay invoices 

   `` 

5. Oracle confirms the escrow is funded by both parties 
    - Cron proccess checks every 10 minutes

6. Oracle fetches results of MLB games and signs the result with the oracles private key
    - Cron process checks every 10 minutes 

7. Winning party spends escrow with oracle signature and private key 
    ``
    ts-node bin/bet broadcastwinnings <bet_id> <winningaddress> <privateKey>      

    `` 

## Usage

```

npm install

//Starts API, GUI and Cron process
npm start

```

## Config 
  //Sports feed mlb season data feed id
  - SPORTSFEED_API_KEY
  - SPORTSFEED_API_PASSWORD
  - DATABASE_URL
  - ORACLE_PUBLIC_KEY
  - ORACLE_PRIVATE_KEY
  - ANYPAY_ACCESS_TOKEN


