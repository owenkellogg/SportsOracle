const bcrypt = require('bcrypt');
import * as models from '../models';


export async function createAccount(email, address, public_key){

  let account = await models.Account.create({
          address: address,
          public_key: public_key,
          email: email
  })

  console.log("account created", account.toJSON())

  return account

}

export async function registerAccount(email: string, password: string): Promise<any>{

  let passwordHash = await hash(password);

  let account = await models.Account.create({
    email: email,
    password_hash: passwordHash
  }); 

  console.log('account created', account.toJSON()
  return account;
}

export async function createAccessToken(accountId: number): Promise<any> {

  let accessToken = models.AccessToken.create({
    account_id: accountId
    uid: await hash(parseInt(accountId)
  });

  return accessToken;

}


export function hash(password) {
  return new Promise((resolve, reject) => {

    bcrypt.hash(password, 10, (error, hash) => {
      if (error) { return reject(error) }
      resolve(hash);
    })
  });
}

