const port = process.env.PORT || 3000;
const expressServer = require('./src/expressServer');
const dataUpdate = require('./src/dataUpdate')
let listener

const init = async()=>{
  try{
    let gameDataReady = await dataUpdate.update()
    if(gameDataReady){
      dataUpdate.start()
      listener = expressServer.listen(port, () => {
        console.log(`swgoh-stats is listening on port ${listener.address().port} for swgoh stat requests.`);
      });
    }else{
      setTimeout(init, 5000)
    }
  }catch(e){
    console.error(`Unable to initialize swgoh-stats: ${e.message}`)
    setTimeout(init, 5000)
  }
}
init()
