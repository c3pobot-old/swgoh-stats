'use strict'
const mongo  = require('mongoapiclient')
const app = require('./expressServer');
let gameVersion
const UpdateGameData = async()=>{
  try{
    const tempObj = (await mongo.find('botSettings', {_id: 'gameData'}))[0]
    if(tempObj?.version && tempObj?.data && tempObj?.version !== gameVersion){
      console.log('Setting new GameData version : '+tempObj.version)
      let status = await app.setGameData(tempObj?.data)
      if(status) gameVersion = tempObj.version
    }
    return gameVersion
  }catch(e){
    console.error(e);
  }
}
const StartSync = async()=>{
  try{
    await UpdateGameData()
    setTimeout(UpdateGameData, 60000)
  }catch(e){
    console.error(e);
    setTimeout(UpdateGameData, 5000)
  }
}
module.exports.update = UpdateGameData
module.exports.start = StartSync
