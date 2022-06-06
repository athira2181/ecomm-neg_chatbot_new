import React, { useEffect, useState } from 'react'
import '../styles/ProductDetail.css'
import {Link,useNavigate } from "react-router-dom"
import {Row ,Card, Col, Button, Image} from 'react-bootstrap'
import Axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import * as chatbotActions from '../store/actions/chatbotActions'
// import { useNavigate } from 'react-router';
// import Button from 'react-bootstrap/Button'
// import { FaPlus } from "react-icons/fa";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row"
// import Image from 'react-bootstrap/Image'
import Category from './Category'
// import Button from 'react-bootstrap/Button'


function ProductDetail() {
    let [disabled , showDisabled] = useState();
    let [prods,setProducts]= useState([]);
    let navigate = useNavigate();
    const dispatch = useDispatch() 
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
        other_prods();
        } , [] )

    function showProd(){
        let prod_details = localStorage.getItem('product_Details');
        if(prod_details){
            return JSON.parse(prod_details);
        }
        else{
            return []
        }
  } 
  const setBrandName = (brandname) =>{
    console.log("brandname is "+ brandname);
    localStorage.setItem("brand_name",brandname);

  }

  const other_prods = ()=>{
    const p_name = showProd().p_name
    const pid = showProd().pid
    Axios.post("http://localhost:3002/otherSeller",{
      pid: pid,
      p_name: p_name
    }).then((response)=>{
      setProducts(response.data)
      // console.log(prods[2].p_name)
      // card_display(prod)
    })
  }

  const negotiate = ()=>{
    const data = {
      command: "###nego",
      text: "Negotiate",
      pid: showProd().pid
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
  return (
    <div>
        <Category/>
        <Row className='.g-0'>
            <Col md={5}><Image src={showProd().img} fluid="true" className="imgstyle" style={{height:"40rem",width:"39rem"}} alt='Not available'/></Col>
            <Col style={{fontFamily:"'Poppins', sans-serif"}} md={4}>
                   <h2 className='prodname'>{showProd().p_name}</h2>
                   <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName(showProd().brand)}>Visit {showProd().brand} Store</Link>
                   <br></br><br></br><br></br>
                   <Row>
                       <Col className='title'>Price</Col>
                       <Col>{showProd().price}</Col>
                   </Row>
                   <Row>
                       <Col className='title'>Brand</Col>
                       <Col>{showProd().brand}</Col>
                   </Row>
                   <br></br>
                   <Row>
                       <Col className='title'>About this item</Col><br></br>
                    </Row>
                       <pre style={{whiteSpace: "pre-wrap"}}>{showProd().description}</pre>
                       <Button disabled={disabled} onClick={negotiate} style={{backgroundColor:"rgb(93 56 54)",border:"none"}}>Negotiate</Button>
                       <Button disabled={disabled} onClick={()=>addtoCart(showProd())} style={{backgroundColor:"#e07b3c"}}>Add to Cart</Button>
            </Col >
            <Col className='shadow-lg p-3 mb-5 bg-white rounded mx-auto' md={3}>
                 <Card className="box">
                   <Card.Header>Other Sellers on ShopHunt</Card.Header>
                   {prods.map((prod=>
                    <Card.Body>
                    <Card.Title>₹ {prod.price}</Card.Title>
                    
                    <Card.Subtitle>Sold by: {prod.shop_name} </Card.Subtitle>
                    <Card.Text>
                      <Row>
                      <Card.Body className='last_section' style={{marginTop: "0px"}}>
           
                      {/* <Button disabled={disabled} onClick={negotiate} style={{backgroundColor:"rgb(93 56 54)",border:"none"}}>Negotiate</Button> */}
                      <Button disabled={disabled} onClick={()=>addtoCart(prod)} style={{backgroundColor:"#e07b3c"}}>Add to Cart</Button>
                     </Card.Body></Row>
                    </Card.Text>
                  </Card.Body>
                    ))}
                   
                 </Card>
            </Col>
        </Row>
      
    </div>
  )
}

export default ProductDetail
