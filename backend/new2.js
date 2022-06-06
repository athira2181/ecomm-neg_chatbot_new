// Load Node Packages
express = require('express');
body_parser = require('body-parser');
request = require('request');
csv = require('csv-writer');
fs = require('fs');
app = express();
port = process.env.PORT || 3002
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "price_neg"
})
app.use(body_parser.urlencoded({
    extended: false
}));

// Process application/json
app.use(body_parser.json());


app.post('/webhook/', function (req, res) {
    content = req.body
    intent_name = req.body.queryResult.intent.name
    console.log(intent_name)
    createCsvWriter = require('csv-writer').createObjectCsvWriter;
    csv_writer = createCsvWriter({
      path: 'users-info.csv',
      header: [
        {id: 'user_name', title: 'User Name'},
        {id: 'user_email', title: 'User Email'},
        {id: 'user_query', title: 'User Query'},
      ],
      append : true
    });

    data = [
      {
        user_name: content.queryResult.parameters.userName,
        user_email: content.queryResult.parameters.userEmail,
        user_query: content.queryResult.parameters.userQuery

      }
    ];

    csv_writer
      .writeRecords(data)
      .then(()=> console.log('The CSV file was written successfully'));
    // if(intent_name=="projects/online-shopping-kb99/agent/intents/844d9a64-77e9-4ab3-b36f-a5298bd43e1f"){
    if(req.body.queryResult.queryText=="Show me products"){
        
            db.query("SELECT p_name FROM products",
            (err,result)=>{
                if(err){
                    return console.log(err);
                }
                var prod=req.body.queryResult.fulfillmentText;
                for(i=0;i<result.length;i++){
                    prod= prod+", "+result[i].p_name
                }
               response =  {
                "fulfillmentText": prod
              }
              res.send(response);
              console.log(response);
              console.log(result[0].p_name);
              
            });

            
        
    }
    else{
    response =  {
      "fulfillmentText": req.body.queryResult.fulfillmentText
    }
    res.send(response);
}
//    }
//    else if(intent_name=){
//     response =  {
//         "fulfillmentText": "Hello, nice to meet you."
//       }
//       res.send(response); 
//    }
  
    
});


// Listen Requests
app.listen(port, function () {
    console.log('webhook is running on port', port)
})