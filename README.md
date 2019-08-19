
# SportsOracle

This repository is an Oracle for MLB baseball data and a library to create escrow transactions on the Bitcoin Cash Blockchain 

### 0. Create 2 Public/Private key pairs for player 1 and player 2

```
ts-node bin/bet.ts createkeypair
ts-node bin/bet.ts createkeypair

```

### 1. Player 1 proposes bet 

```
ts-node bin/bet.ts listtodaysgame 

//example sports_feed_id 48847 (away) is the winner   
ts-node bin/bet.ts createproposal <public_key> <sports_feed_id> <amount> <pick (home|away> 

```

### 2. Player 2 accepts bet 

 ```
 //parameters proposal_id player_2_public_key
 ts-node bin/bet.ts acceptproposal <proposal_id> <player_2_public_key>

 ```
 
### 3. An escrow is created with the public key of, Player 1, Player 2 and the Oracle.

### 4. Player 1 and Player 2 fund the escrow via an Anypay Invoice

 ```
 Pay Anypay invoices 
 ``` 
### 5. Oracle confirms the escrow is funded by both parties 
    - Cron proccess checks every 10 minutes
```
ts-node bin/bet.ts updateEscrowStatus <betId>

```
### 6. Oracle fetches results of MLB games and signs the result with the oracles private key
    - Cron process checks every 10 minutes 

### 7. Winning party spends escrow with oracle signature and private key 
 ```
 ts-node bin/bet broadcastwinnings <bet_id> <winningaddress> <privateKey>      
 ``` 

## Utility
```
ts-node bin/bet createkeypair 

```

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



### KEY Derivation strategy

Repository has 1 Master key 

Each password is a derivation of the master with the path being `m/n` where n is the sum of the ascii values of the hash of the .env name

for example AMQP_URL password = master.deriveChild( sha256(asciiSum('AMQP_URL'))).privateKey.toString()

Each Actor has a key with the name being used to derive the key. 





