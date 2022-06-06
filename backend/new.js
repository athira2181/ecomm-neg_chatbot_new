// Load Node Packages
const express = require('express');
// body_parser = require('body-parser');
request = require('request');
csv = require('csv-writer');
fs = require('fs');
// app = express();
// const { express } = require('actions-on-google/dist/framework/express');
// port = process.env.PORT || 3002
const mysql = require("mysql");
// const cors = require("cors");
// app.use(cors());

// app.use(express.json());


const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "price_neg"
})
// app.use(body_parser.urlencoded({
//     extended: false
// }));

// Process application/json
// app.use(body_parser.json());

const chat = express.Router();
pass = "";

function router(){
  
  chat.post('/', function (req, res) {
    const content = req.body;
    console.log(content.queryResult.intent.displayName);
    intent_name = req.body.queryResult.intent.name
    console.log(intent_name)
    createCsvWriter = require('csv-writer').createObjectCsvWriter;
    csv_writer = createCsvWriter({
      path: 'users-info.csv',
      header: [
        {id: 'query', title: 'User Text'},
        {id: 'fulfillment', title: 'Chatbot Text'},
        
      ],
      append : true
    });

    data = [
      {
        query: content.queryResult.queryText,
        fulfillment: content.queryResult.fulfillmentText

      }
    ];
    console.log(data[0].fulfillment);
    csv_writer
      .writeRecords(data)
      .then(()=> console.log('The CSV file was written successfully'));
    // if(intent_name=="projects/online-shopping-kb99/agent/intents/844d9a64-77e9-4ab3-b36f-a5298bd43e1f"){

    
    if(req.body.queryResult.queryText=="Add to cart"){
        
            db.query("SELECT p_name FROM products",
            (err,result)=>{
                if(err){
                    return console.log(err);
                }
                var prod=req.body.queryResult.fulfillmentText;
                for(i=0;i<result.length;i++){
                    prod= prod+", "+result[i].p_name
                }
                console.log(prod,"wow..")
               response =  {
                "fulfillmentText": prod
              }
              res.send(response);
              console.log(response);
              console.log(response.fulfillmentText);
              
            });

            
        
    }
    else{
      // req.body.queryResult.queryText= pass;
     
    response =  {
      "queryResult": {
      "queryText": req.body.queryResult.fulfillmentText
    }}
    res.send(response);
    console.log(response)
}}
//    }
//    else if(intent_name=){
//     response =  {
//         "fulfillmentText": "Hello, nice to meet you."
//       }
//       res.send(response); 
//    }
  
    
);
//  return chat;
//  chat.post('/chat_in', function (req, res) {
//   pass=req.body.msg;
//   console.log(req.body);
//   console.log(req.body.msg)
//   res.send(pass)
//  });
  return chat;
}
module.exports = router;




// Listen Requests
// app.listen(port, function () {
//     console.log('webhook is running on port', port)
// })