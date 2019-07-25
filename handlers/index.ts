import * as lib from '../lib'

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
