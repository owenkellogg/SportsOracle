# SportsOracle

This repository is an Oracle for MLB baseball data and a library to create escrow transactions on the Bitcoin Cash Blockchain 

1. Player 1 proposes bet 

2. Player 2 accepts bet 

3. An escrow is created with the public key of, Player 1, Player 2 and the Oracle.

4. Player 1 and Player 2 fund the escrow via an Anypay Invoice

5. Oracle confirms the escrow is funded by both parties 

6. Oracle fetches results of MLB games and signs the result with the oracles private key

7. Winning party spends escrow with oracle signature and private key 

## Usage

```

npm install

npm start

```


## Documentation

    

## Config 
  //Sports feed mlb season data feed id
  - SPORTSFEED_API_KEY
  - SPORTSFEED_API_PASSWORD=MYSPORTSFEEDS
  //Postgres Databas URl
  - DATABASE_URL
  //Oracle Public Key 
  - PUBLIC_KEY
  //Oracle Private Key
  - PRIVATE_KEY=df38e44bf2dfe49b3e7f7b41019f6dc4ceb15fcc6cb06edca5311b69e76c5082
  //Access Token to ANYPAY account
  - ANYPAY_ACCESS_TOKEN


