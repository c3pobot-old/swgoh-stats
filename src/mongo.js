'use strict'
const fetch = require('node-fetch')
const Cmds = {}
const Request = async(method, collection, matchCondition, data, limitCount, skipCount )=>{
  try{
    const payload = { collection: collection, matchCondition: matchCondition, data: data, limitCount: limitCount, skipCount: skipCount }

    const obj = await fetch(process.env.MONGO_API_URI+'/'+method, {
      method: 'POST',
      timeout: 60000,
      compress: true,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    const resHeader = obj?.headers.get('content-type')
    if(resHeader?.includes('application/json')) return await obj.json()
  }catch(e){
    console.error(e);
  }
}
module.exports = Request
