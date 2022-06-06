const dialogflow = require('@google-cloud/dialogflow');

// const dialogflowConfig = require('./config/config')
const express =require('express');
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "price_neg"
})

const projectId = "online-shopping-kb99"
const configuration = {
  credentials: {
    private_key: "private_key",
    client_email: "client_email",
  },
}

// const sessionId = '997753'
// const languageCode = 'en-US'
const sessionClient = new dialogflow.SessionsClient(configuration)

const detectIntent = async (languageCode, queryText, sessionId) =>{

    let sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);


//   console.log('message ' + message)
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  };

    const responses = await sessionClient.detectIntent(request)
    let para;
    
    
      //console.log(JSON.stringify(responses))
    const result = responses[0].queryResult;
    if(result.intent.displayName == "product_search"){
      console.log(result.parameters.fields.product.stringValue);
      para = result.parameters.fields.product.stringValue
    }
    // console.log(result)
      return {
          response: result.fulfillmentText,
          intent_name : result.intent.displayName,
          parameter : para
      };

}
// detectIntent('en','Show me products','12345678')
const webApp = express();
webApp.use(cors());
// Webapp settings
webApp.use(express.urlencoded({
    extended: true
}));
webApp.use(express.json());

// Server Port
// const PORT = process.env.PORT || 3001;

// Home route
// webApp.get('/', (req, res) => {
//     res.send('Hello World.!');
// });
const test = express.Router()
// Dialogflow route
function router(){
test.post('/', async (req, res) => {

    // let languageCode = req.body.languageCode;
    let msg = req.body.command;
    if(msg!="###nego"){
    let queryText = req.body.text;
    let sessionId = req.body.userName;
    console.log(queryText)
    let responseData = await detectIntent('en', queryText, sessionId);
    console.log(responseData)
    res.send(responseData);
    }
    else{
      let pid = req.body.pid
      console.log(pid)
      db.query("select p.p_name,p.img,p.price,p.brand,s.shop_name from products p, shop s where p.shop_id=s.shop_id and p.pid = ?",[pid],
      (err,result)=>{
        if(err){
          return console.log(err)
        }
        
        console.log(result);
        res.send(result);
        
      })
    }

});
return test;
}
module.exports = router;
// Start the server
// webApp.listen(PORT, () => {
//     console.log('Server is up and running at '+PORT);
// });
