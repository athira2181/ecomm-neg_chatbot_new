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
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7tfm1NOpVM+CX\ngl788kkSxi9MJUexXAYDpnoqHZJUi5aRc+HaAqU+uGvq0ipJm794Uuzax+1dfgSW\nLMNqWrbcPUmmbKV81entN1TqGXUqoAVM43SAqKRUl1+jXIGegR4eF5xdXy6hkCJv\npjNwkL6fbZiIT/rVVn2b97LFcwPgFvuR02bCGlg/yPz/Jtzzql7K8SSUt0b5Vg60\nAmwBePiFzXN9si0TjqG+gVMsezwbGliVH4xH4GVufNqLBH5gPbmbeicp4dfwn8Lc\n42nGH6ti2hpJMQ1tCBq8Qufo502T6wgzSDrfHmWvhByYIzODg/bXrWd9eVhjgli6\neIuV5zyxAgMBAAECggEAFtZxjpPlDL+2jAhvERxTOqcFGyEQA2qcSrZm95fIdWPU\nSlcMe+9FdoeOja/LOFBsL7H7IjUf0neiDDle/yIRTGNigg6G5dTK1LMeMCsvv6Nf\ncbbctkiOUcJm/uOi24t/BA9AVXXeoQZ9whK5AHGD17bIT5FXhbwzpRWyWOaA6rL7\nlnCh8vCxZJe6Ns6rDZV0Es5nJwFThHp9eyVsSghqZezF2BtxddQKaVB1F83uXlcT\nXpjpZ/6zlzAh1oMGMixOPF698H8eEKkiegHyqecqlSeCA7lSYaXhWK8E3z/g0muw\ngm4iYz2aU196YRObPlsHJMYqH/Q8LF2ZVF8VdNbE6QKBgQDvIzbuWY3GeEHMsaat\nd+gLmFNmNnVwSbTrzOFvbUQiUcR7174jpJqnT/X+HusR6oWjJ/xyDk0AOF3DHnBO\nsBMuIVl5oPNM+MfiFdUOnZsC6YoZrYoKC7qvApEtTxsLl13HCNk3KBPIvhEDQOtt\nwRnBut21AHr9d1MmCa8JY5rXrQKBgQDI8m7NeMpU1RbSmWdnY3htWya17VsbB9uB\nye5jnBDdIJbSFnHX6qzCN98RjpkJYmloE5l6e5U9HTdALbP3A5xM8b2WdXUdWR59\n1ldUDS9iU8b7rBiaIu1sSQFZ0tfD/doKBO3Gt4oW1fDV3hCkADX8jCmM0t3TzL5W\ngZPZLNEplQKBgCCTy4fs60N+XnhkOzCmhRYPSk1CXf1ODTeSUaO8XuvN99ZnLZ/t\nbKQeYISd8agfKtVvPRTMnfDJvPw3yVTu564BHQ9UvdBek9xY3Q2Aqv1ak1WsLoHv\n1x7AWsaxYB3UIRJcQjshWpCeU/L9hRUOmVOrAUkHJ7of51PnPdEpoI6BAoGBAKF0\ncOS05dTtda32xeeDO7KZ52uLb4UzdgI9bkYokkApvCTHFeeHThGq9JdVvM6WfNy7\nyrhn7YwyGj99uTiCdSY5obvvWg8fmOlAu9/zzBuz9pAmQYovABbePbCfQO/f2j3s\noePlepVIhn5AM5yh8r6dG5FjqApSWqiE6nc3lENVAoGACoMsZBg2svsbyeCcocQb\nPi13XcFEanhptBEP0oxwswgjpK9R9HnYLL55mpMrOdjrdVSQH/8cwLh7SfYrxoyr\nh5vL26Fz9pC3qmAeHZTB5OOxSFA5dSu4l/XpxRQfvhqRGFqCI3psLnIgV8KTq6+S\n2UUseoQVzb33nTYaFzdbYRY=\n-----END PRIVATE KEY-----\n",
    client_email: "chat-df-server@online-shopping-kb99.iam.gserviceaccount.com",
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