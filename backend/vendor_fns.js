const express = require('express');
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "price_neg"
})
const vend = express.Router();

function router(){
    vend.get('/getshopadminfo/:shopid', (req, res) =>{
        const shop_id = req.params.shopid;
        // console.log("shopid is " + shop_id );
    
        db.query("SELECT * FROM shop WHERE shop_id = ?", [shop_id],
        (err,result)=>{
            console.log("ha"+result);
            if(err){
                return console.log(err);
            }
            // usrname= result[0].username;
            res.status(200).send({result});
        }
        );   
    });
    vend.get('/getproducts/:shopid', (req, res) =>{
        const shop_id = req.params.shopid;
        // console.log("shopid is " + shop_id );
    
        db.query("SELECT * FROM products WHERE shop_id = ?", [shop_id],
        (err,result)=>{
            console.log("haaai"+result);
            if(err){
                return console.log(err);
            }
            // usrname= result[0].username;
            res.status(200).send({result});
        }
        );   
    });
    vend.post('/addproduct', (req, res) =>{
        const shopid = req.body.shopid;
        const productname = req.body.prodname;
        const price = req.body.price;
        const minprice = req.body.minprice;
        const image = req.body.image;
        const category = req.body.category;
        const subcategory = req.body.subcategory;
        const brand = req.body.brand;
        const quantity = req.body.quantity;
        const description = req.body.description;
    
    
        db.query("INSERT INTO products (shop_id,catg_id,subcatg_id,p_name,price,minprice,img,brand,qnty,description) VALUES (?,?,?,?,?,?,?,?,?,?)", 
        [shopid,category,subcategory,productname,price,minprice,image,brand,quantity,description],
        (err,result)=>{
            console.log(result);
            if(err){
                return console.log(err);
            }
           res.send({result});
        }
        );   
    });
    vend.get('/getsubcatgname/:subcatid', (req, res) =>{
        const subcat_id = req.params.subcatid;
    
        db.query("SELECT * FROM subcategory WHERE subcatg_id = ?", [subcat_id],
        (err,result)=>{
            // console.log("category name " +JSON.parse(JSON.stringify(result)));
            // ress=JSON.parse(JSON.stringify(result));
            // console.log(ress[0]['subcatg_name']);
            if(err){
                return console.log(err);
            }
            res.status(200).send({result});
        }
        );   
    });
    vend.put('/updateproduct', (req, res) =>{
        const product_id = req.body.prod_id;
        const productname = req.body.prodname;
        const price = req.body.price;
        const minprice = req.body.minprice;
        const image = req.body.image;
        const category = req.body.category;
        const subcategory = req.body.subcategory;
        const brand = req.body.brand;
        const quantity = req.body.quantity;
        const description = req.body.description;
        console.log("update "+req.body);
    
    
        db.query("UPDATE products SET catg_id=?,subcatg_id=?,p_name=?,price=?,minprice=?,img=?,brand=?,qnty=?,description=? WHERE pid=?", 
        [category,subcategory,productname,price,minprice,image,brand,quantity,description,product_id],
        (err,result)=>{
            console.log(result);
            if(err){
                return console.log(err);
            }
           res.send({result});
        }
        );   
    });
    vend.delete('/deleteproduct/:prodid', (req, res) =>{
        const product_id = req.params.prodid;
    
        db.query("DELETE FROM products WHERE pid = ?", [product_id],
        (err,result)=>{
            console.log("success");
            if(err){
                return console.log(err);
            }
    
            res.status(200).send({result});
        }
        );   
    });

    return vend;
}
module.exports = router;