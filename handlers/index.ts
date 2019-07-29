import * as lib from '../lib'

import * as bet from '../lib/bet'

import * as api from '../lib/api'

export async function getOracleKey(request){


  const params = request.params 

  try{

    return await lib.getOraclePublicKey(params.id) 

  }catch(error){

    console.log(error)

  }


}

export async function getAllGames(){

  try{

    return await lib.getAllGames() 

  }catch(error){

    console.log(error)

  }

}


export async function getGame(req){

  try{

    return await lib.getGame(req.params.id) 

  }catch(error){

    console.log(error)

  }

}


export async function getTodaysGames(){
      
  try{

    return await api.getTodaysGames() 

  }catch(error){

    console.log(error)

  }

}

export async function getYesterdaysGames(){
  
  try{

    return await api.getYesterdaysGames() 

  }catch(error){

    console.log(error)

  }

}

export async function getProposals(){
  
  try{
    return await api.getProposals()
  }catch(error){
   console.log(error)
  }


}


export async function createProposal(req){
 
  try{

    console.log('PAYLOAD create proposal:', req.payload)

    return await bet.createProposal(req.payload.sports_feed_id, req.payload.public_key, req.payload.amount, req.payload.message)
          // return await bet.createProposal(req.payload.

  }catch(error){

    console.log(error)

  }


}

export async function acceptProposal(req){

  try{

    console.log("accept proposal", req.payload)

    return await bet.acceptProposal(req.params.id, req.payload.public_key)

  }catch(error){
    console.log(error)
  }


}
export async function getProposal(req){

  try{

    console.log("accept proposal", req.payload)

    return await api.getProposal(req.params.id)

  }catch(error){
    console.log(error)
  }


}


export async function getAcceptedBets(req){

try{

  return await api.getAcceptedBets()

}catch(error){
  console.log(error)
}


}

