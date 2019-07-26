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
