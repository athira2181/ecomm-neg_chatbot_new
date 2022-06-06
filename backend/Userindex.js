const express = require("express");
const userreg = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt")
const app = express();//connectiom

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "price_neg"
})
function router(){
    
    userreg.post('/', async(req, res) =>{//on anything go to index.js
    
       console.log(req.body);
        const first_name=req.body.first_name;
        const middle_name=req.body.middle_name;
        const last_name=req.body.last_name;
        const home_addr=req.body.home_addr;
        const email=req.body.email;
        const phno=req.body.phno;
        const password=req.body.password;
        // const salt=await bcrypt.genSalt(10);
        // const password=await bcrypt.hash(req.body.password,salt);
        // console.log(password)
    
        db.query("INSERT INTO user(first_name,middle_name,last_name,home_addr,email,phno,password) VALUE (?,?,?,?,?,?,?)",
        [first_name,middle_name,last_name,home_addr,email,phno,password],
        (err,result)=>{
            console.log(result);
            if(err){
                return console.log(err);
            }
            res.send({result});
        }
        );   
    });
    
    userreg.post('/loguser',async(req, res) =>{
      
    const email = req.body.email;
    const password=req.body.password;

    db.query("SELECT * FROM user WHERE email = ? ",[email],
    async(err,result)=>{
      
      
        if(err){
          return console.log(err);
        }
       
        if (result.length > 0)
         {
          //  const validp=  await bcrypt.compare(password,result[0].password);
          // console.log(result[0]);
            if(password==result[0].password)
             {
              
              
              console.log("---------> Login Successful");
                // res.send({ message: "Successful login" });
               user_id= result[0].user_id;
                res.status(200).send({user_id});
                
                
              } 
              else {
         
                res.send({ message: "Password does not match" });
              }

              
            }
       else{
         
            res.send({ message: "Email not registered" });
          }
}
          );
        
      
      
    });
        
    

    return userreg;//connection
}
module.exports = router;//for connection with index.js

