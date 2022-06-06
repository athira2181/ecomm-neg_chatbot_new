import React, {useEffect,useState} from 'react'
import {Row ,Card, Col, Button, Image} from 'react-bootstrap'
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

function BuyNow() {

  let [prods,setProducts]= useState([]);
  let index = 0;
  let total_price=0;
  let total_gst=0
  let deliver=0
  let cart_price=0
  const [payment,setPayment] = useState("Netbanking")
  const [cart_count,setCartCount]=useState("")
  const [ship_addr,setShipAddr]=useState(showUser().home_addr)
  let navigate= useNavigate()

  useEffect( ()=>{
    prod_display()
    showUser()
  },[])
  const totalPrice=(price)=>{
      total_price = total_price+price
  }

  const gstTotal=(gst)=>{
    total_gst = total_gst+gst
}

  function showUser(){
    Axios.post("http://localhost:3002/edit_profile",{
           user_id: localStorage.getItem("user_id"),
           command: "display_user"
       }).then((response)=>{
        //  console.log([response.data[0]])
          localStorage.setItem("user_detail",JSON.stringify(response.data[0]))
       })
    let user_details = localStorage.getItem('user_detail');
    if(user_details){
        return JSON.parse(user_details);
    }
    else{
        return []
    }
}

const discount=(minprice,price,qty)=>{
    cart_price=0
  let single_profit = price-minprice
  let qty_profit = (price*qty)-(minprice*qty)
  let extra_profit = (qty_profit)-(single_profit)
  
  cart_price = (price*qty)-(extra_profit*0.1)
  
  console.log("cartprice",cart_price,minprice)
}

  const prod_display = ()=>{
    // setPid(localStorage.getItem("pid")) 
    // setUserId(localStorage.getItem("user_id"))
    // setQnty(localStorage.getItem("qnty")) 
    // setPrice(localStorage.getItem("price")) 

    // console.log("local",pid);
    
    Axios.post("http://localhost:3002/cart",{
      command: "display",
      user_id: localStorage.getItem("user_id")
    }).then((response)=>{
      setProducts(response.data)
      
      console.log(response.data.length)
      setCartCount(response.data.length);
      // itemRemove();
      // card_display(prod)
      
      
    })
  }

  const buy =(e)=>{
    
    e.preventDefault();
    if(cart_count!=0){
    if(payment=="Cash on Delivery"){
    console.log(payment)
    prod_display();
    Axios.post("http://localhost:3002/buy",{
       command:"confirm",
       user_id: localStorage.getItem("user_id"),
       ShippingAddress: ship_addr,
       payment_type: payment,
       total_price: (total_price+total_gst),
       delivered: deliver
     }).then((response)=>{
       console.log(response.data)
      //  console.log("pay",payment)
      localStorage.setItem("order_id",response.data)
      navigate("/bill")
     })}
     else if(payment=="Netbanking"){
      console.log(payment)
      navigate("/netbanking")
     }
     else if(payment=="Card"){
      console.log(payment)
     }}
     else{
       alert("No products left");
     }
  }
  return (
    <div style={{position:"relative"}}>
      {/* <div style={{textAlign:"center", fontWeight:"bold", fontSize:"24px"}}>BUY PRODUCTS</div> */}
      <br/><br/>
      <div className='container'>
        <Row className='.g-0' md={2}>
          <Col md={6}>
             <h4>Your details</h4>
             <form onSubmit={buy}>
               <Row >
               <div class="form-group col-md-4">
               <label for="firstname">First Name</label>
              <input type="text" value={showUser().first_name} class="form-control" id="firstname"  readOnly/>
             </div>
             <div class="form-group col-md-4">
              <label for="middlename">Middle Name</label>
              <input type="text" value={showUser().middle_name} class="form-control" id="middlename"  readOnly/>
             </div>
              <div class="form-group col-md-4">
              <label for="lastname">Last Name</label>
              <input type="text" value={showUser().last_name} class="form-control" id="lastname"  readOnly/>
             </div>
               </Row>
               <Row>
               <div class="form-group col-md-4">
              <label for="email">Email</label>
              <input type="email" value={showUser().email} class="form-control" id="email"  readOnly/>
             </div>
             <div class="form-group col-md-4">
              <label for="phno">Phone No.</label>
              <input type="number" value={showUser().phno} class="form-control" id="phno"  readOnly/>
             </div>
               </Row>
               <Row>
               <div class="form-group col-md-4">
               <br/>
              <label for="addr">Shipping Address</label>
              <textarea defaultValue={showUser().home_addr} style={{width: "550px"}} onChange={(e)=>setShipAddr(e.target.value)} class="form-control" id="addr" required /><br/>
             </div>
               </Row>
               <Row>
               <div class="form-group col-md-4">
                 <div style={{fontWeight:"bolder"}}>Select payment method</div>
                 <select onChange={(e)=>setPayment(e.target.value)} value={payment}>
                   {/* <option selected>Choose payment type</option> */}
                   <option value="Netbanking">Netbanking</option>
                   <option value="Card">Card</option>
                   <option value="Cash on Delivery">Cash on Delivery</option>
                 </select>
               <br/>
               
               </div>

               </Row>
               <br/><br/>
                 <button className='btn btn-primary'>Place Order</button>
             </form>
          </Col>
          <Col md={6}>
            <Row>
          <Col>
          <Card className="box">
          <Card.Header>Your Order</Card.Header>
          <table className="table table-hover text-center table-responsive-sm caption-top">
          
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">GST</th>
            </tr>
          </thead>
          <tbody>
          {
              prods.map((prod =>
                
                < tr key={prod.pid}>
                  {discount(prod.minprice,prod.price,prod.qty)}
                  {totalPrice(cart_price)}
                  {gstTotal(Math.round(cart_price*prod.gst))}
                  <th scope="row">{++index}</th>
                  <th scope="row">
                    <img src={prod.img} style={{ width: '4rem' }} />
                  </th>
                  <td>{prod.p_name}</td>
                  <td>
                    {cart_price}
                  </td>
                  <td>{prod.qty}</td>
                  <td>{Math.round(cart_price*prod.gst)}</td>
                </tr >
              ))}
              </tbody>
              {/* <tr>
                <th>Total</th>
                <td></td>
                <td></td>
                <td>{total_price}</td>
              </tr> */}
          
        </table>
          </Card>
          </Col> 
          </Row>
          <Row className='justify-content-end'>
            <Col md={4} >
            <br/><br/>
            <Card className="box">
              <table style={{margin:"10px"}}>
                <tr>
                  <th>Items</th>
                  <td style={{textAlign:"right"}}>{index}</td>
                </tr>
                <tr>
                  <th>Subtotal</th>
                  <td style={{textAlign:"right"}}>{total_price}</td>
                </tr>
                <tr>
                  <th>GST total</th>
                  <td style={{textAlign:"right"}}>{total_gst}</td>
                </tr>
                <tr>
                  <th>Total</th>
                  <td style={{textAlign:"right"}}>{total_price+total_gst }</td>
                </tr>
                </table>
            </Card><br/>
            </Col>
          </Row>
          </Col> 
        </Row>
        
      </div>
    </div>

    
  )
}

export default BuyNow
