import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {Link, useNavigate } from "react-router-dom"
import '../styles/Single_shop_prods.css'
// import Button from 'react-bootstrap/Button'
import {BiRupee } from "react-icons/bi";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from 'react-bootstrap/Button'
import Category from './Category'
import { useDispatch, useSelector } from "react-redux";
import * as chatbotActions from '../store/actions/chatbotActions'

function Prod_By_Brand() {
    let navigate = useNavigate();
    const dispatch = useDispatch() 
    let [products , showProducts] = useState([]);
    let [disabled , showDisabled] = useState();
    
    const userLoggedin = ()=>{
      if(localStorage.getItem("user_id")){
        showDisabled(false)
      }
      else{
        showDisabled(true)
      }
    }


    useEffect( () =>{
      userLoggedin();
      getBrandName(); 
      } , [] )

    const getBrandName = () =>{
        var brandName = localStorage.getItem("brand_name");
        console.log(brandName);
        Axios.get("http://localhost:3002/getproducts/getproductsbybrand/"+brandName)
        .then((response)=>{
            let resp= response.data.result;
            console.log(resp);
            showProducts(resp);
        })
      }
      const setProd = (prod)=> {
        localStorage.setItem('product_Details',JSON.stringify(prod));
      }
      const addtoCart = (prod)=>{
        localStorage.setItem('pid',prod.pid);
        localStorage.setItem('qnty',1);
        localStorage.setItem('price',prod.price);
        Axios.post("http://localhost:3002/cart",{
          command: "insert",
          pid: localStorage.getItem("pid"),
          user_id:localStorage.getItem("user_id"),
          qnty: localStorage.getItem("qnty"),
          price:localStorage.getItem("price")
        }).then((response)=>{
          // setProducts(response.data)
          console.log(response.data)
          itemRemove();
          // card_display(prod)
        })
    
        // navigate('/cart2');
    
      } 
    
      const itemRemove = ()=>{
        localStorage.removeItem("pid");
        localStorage.removeItem("qnty");
        localStorage.removeItem("price")
      }

      const negotiate = (prod)=>{
        const data = {
          command: "###nego",
          text: "Negotiate",
          pid: prod.pid
      }
      dispatch(chatbotActions.textQueryAction(data))
        openForm()
      }
    
      const openForm = () =>{
        document.getElementById("notif").style.display = "none";
        document.getElementById("chat-wrapper").style.minHeight= "550px";
        document.getElementById("chat-wrapper").style.opacity= "1";
        document.getElementById("chat-wrapper").style.transform= "translate3d(0px, 0px, 0px) scale(1, 1)";
        document.getElementById("chat-wrapper").style.transition= "transform 0.8s ease, opacity 0.8s ease-in"; 
        // console.log("hi");
    }
  return (
    <div>  
      <Category/><br></br>
      <Row xs={2} md={4} className="g-4" style={{marginLeft:"30px", marginRight:"30px"}}>
  {products.map((product => 
    <Col>
      <Card key={product.pid}  className="box" style={{backgroundColor:"rgb(238 190 64 / 17%)",border: "1px solid #82837f73",marginBottom:"0px",paddingBotton:"0px"}}>
        <Link to="/productdetail" onClick={()=>setProd(product)}style={{textDecoration:"none",color:"black"}}>
        <Card.Img variant="top" src={product.img}  /></Link>
        <Card.Body>
          <Card.Title style={{fontSize:"20px"}}>{product.p_name}</Card.Title>
          <Card.Subtitle>{product.brand}</Card.Subtitle>
          <Card.Text>
          <div className="text">
                    {/* <div className="rating_reviews">
                        <div className="rating">
                            <input type="radio" name="rating" value="5" id="5" />
                            <label htmlFor='5'>☆</label>
                            <input type="radio" name="rating" value="4" id="4" />
                            <label htmlFor='4'>☆</label>
                            <input type="radio" name="rating" value="3" id="3" />
                            <label htmlFor='3'>☆</label>
                            <input type="radio" name="rating" value="2" id="2" />
                            <label htmlFor='2'>☆</label>
                            <input type="radio" name="rating" value="1" id="1" />
                            <label htmlFor='1'>☆</label>
                        </div>
                        <Card.Text>4.7</Card.Text>
                        <Card.Text>32 reviews</Card.Text>
                    </div> */}
                    <div className="price" style={{paddingTop:"2%",paddingRight:"10%"}}>
                        <h5 style={{fontWeight:'bold'}}><BiRupee style={{fontSize: '23px'}}/>{product.price}</h5>
                        {/* <div className="qty">
                            <i onClick={DecBag}><FaMinus/></i>
                            <Card.Text>{addcart}</Card.Text>
                            <i onClick={AddCart}><FaPlus/></i>
                        </div> */}
                        <Button disabled={disabled} onClick={()=>negotiate(product)} style={{backgroundColor:"rgb(93 56 54)",border:"none"}}>Negotiate</Button>
                    </div>
                    
                    <Card.Body className="last_section" style={{marginTop:"0px"}}>
                      <Button disabled={disabled} style={{backgroundColor:"#c05e38"}}>Buy Now</Button>
                      <Button disabled={disabled} onClick={()=>addtoCart(product)} style={{backgroundColor:"#e07b3c"}}> Add to cart</Button>
                    </Card.Body>
                </div>
          </Card.Text>
        </Card.Body>
        
      </Card>
    </Col>
  ))}
</Row>
    </div>
  )
}

export default Prod_By_Brand
