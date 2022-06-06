const express = require('express');
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "price_neg"
})
const prod = express.Router();

function router(){
    prod.get('/getproductsbycatg/:catgid', (req, res) =>{
        const cat_id = req.params.catgid;
    
        db.query("SELECT * FROM products WHERE catg_id = ?", [cat_id],
        (err,result)=>{
            if(err){
                return console.log(err);
            }
            res.status(200).send({result});
        }
        );   
    });
    prod.get('/getproductsbysubcatg/:subcatgid', (req, res) =>{
        const subcat_id = req.params.subcatgid;
    
        db.query("SELECT * FROM products WHERE subcatg_id = ?", [subcat_id],
        (err,result)=>{
            if(err){
                return console.log(err);
            }
            res.status(200).send({result});
        }
        );   
    });
    prod.get('/getproductsbybrand/:brandname', (req, res) =>{
        const brand_name = req.params.brandname;
    
        db.query("SELECT * FROM products WHERE brand = ?", [brand_name],
        (err,result)=>{
            if(err){
                return console.log(err);
            }
            res.status(200).send({result});
        }
        );   
    });
    return prod;
}
module.exports = router;