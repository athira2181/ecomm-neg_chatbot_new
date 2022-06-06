import React, {useEffect,useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBagShopping} from '@fortawesome/free-solid-svg-icons'
import {Row ,Card, Col} from 'react-bootstrap'
import Axios from 'axios'

function Bill() {
    let order_id = localStorage.getItem('order_id')
    let total_price=0;
    let total_gst=0
    let [p_name,setPname] =useState("")
    let [brand,setBrand] =useState("")
    let [s_name,setSname] =useState("")
    let [s_addr,setSaddr] =useState("")
    let [phno,setPhno] =useState("")
    let [gst,setGst] =useState("")
    const [orders,setOrder]=useState([])
    const [prods,setProds] = useState([])
    let index = 0
    const showUser=()=>{
    let user_details = localStorage.getItem('user_detail');
    if(user_details){
        return JSON.parse(user_details);
    }
    else{
        return []
    }}

    useEffect( ()=>{
        order_display()
        order_products()
      },[])
    const dateTime=(s)=>{
        let d = new Date(s);
        return (d.toLocaleString('en-IN')) 
        // console.log(d.toUTCString())
    }
    const totalPrice=(price)=>{
        total_price = total_price+price
        
    }
  
    const gstTotal=(gst)=>{
      total_gst = total_gst+gst
      console.log("gst",gst,total_gst)
  }    
    const order_display = ()=>{
        
        Axios.post("http://localhost:3002/order_display",{
          order_id: localStorage.getItem("order_id")
        }).then((response)=>{
          
          setOrder(response.data);
          console.log(orders)
          // itemRemove();
          // card_display(prod)
          
          
        })
      }
      const order_products =()=>{
        Axios.post("http://localhost:3002/order_prod",{
            order_id: localStorage.getItem("order_id")
          }).then((response)=>{
            
            setProds(response.data);
            console.log(prods)
            // itemRemove();
            // card_display(prod)
            
            
          })
      }

    
  return (
    <div style={{fontFamily:"Courier New"}}>
        <div style={{alignContent:"center",textAlign:"center",marginRight:"80%",marginTop:"25px"}}>
        <FontAwesomeIcon icon={faBagShopping} style={{color: "crimson", width:"25px", height:"25px"}} /><br/>
        <div style={{color:"black",fontFamily:"Lucida Handwriting"}}>ShopHunt</div>
        </div>
        <br/><br/>
        {orders.map((order=>
      <Row className='.g-0' md={2}>
          <Col md={8}>
      
        <div style={{marginLeft:"8%"}}>
            <div style={{fontWeight:"bold",color:"rgb(88, 85, 85)"}}>BILLED TO</div><br/>
            <table>
                <tr>
                    <th>Customer Name:</th>
                    <td>{showUser().first_name} {showUser().middle_name} {showUser().last_name}</td>
                </tr>
                <tr>
                    <th>Shipping Address:</th>
                    <td>{order.ShippingAddress}</td>
                </tr>
            </table>
        </div>
        </Col>
        <Col md={4}>
            <table>
                <tr>
                    <th style={{textAlign:"left"}}>Order No. </th>
                    <td style={{textAlign:"left"}}>&nbsp;ORD# {order_id}</td>
                </tr>
                <tr>
                    <th>Date and Time  </th>
                    <td style={{textAlign:"left"}}><div>&nbsp;&nbsp;{dateTime(order.order_date)}</div></td>
                </tr>
            </table>
            
                
            
            
        </Col>
        </Row>
        ))}
        {prods.map((prod=>
            // <Row className='.g-0'>
            <div>
            {index++}
            {/* {localStorage.setItem('opid',prod.pid)} */}
            {/* {search_prod_name} */}
            {totalPrice(prod.price)}
            {gstTotal(Math.round(prod.price*prod.gst))}
           <div style={{marginLeft:"5%"}}><br/><br/>
              <div style={{fontWeight:"bold"}}>{index}. {prod.p_name}</div><br/>
              <table style={{ marginLeft:"3%"}}>
                  <tr>
                  <th>Brand: </th>
                  <td> {prod.brand}</td>
                  </tr>
                  <tr>
                  <th>Quantity:&nbsp;</th>
                  <td>{prod.qty}</td>
                  </tr>
                  <tr>
                  <th>Sold by:&nbsp;</th>
                  <td>{prod.shop_name}</td>
                  </tr>
                  <tr>
                  <th>Shop Address: &nbsp;</th>
                  <td> {prod.shop_addr}</td>
                  </tr>
                  <tr>
                  <th>Phone no.:&nbsp;</th>
                  <td>{prod.phno}</td>
                  </tr>
                  <tr>
                  <th>MRP:&nbsp;</th>
                  <td>Rs. {prod.maxprice}</td>
                  </tr>
                  <tr>
                  <th>Price:&nbsp;</th>
                  <td>Rs. {prod.price}</td>
                  </tr>
              </table>
          </div>
          </div>
            ))}
        <div style={{alignContent:"center", marginLeft:"50%"}}><br/><br/>
        <table>
               <tr>
                   <th>Subtotal Price:</th>
                   <td>{total_price}</td>
               </tr>
               <tr>
                   <th>Subtotal Savings:</th>
                   <td></td>
               </tr>
               <tr>
                   <th>Total GST:</th>
                   <td>{total_gst}</td>
               </tr>
               <tr>
                   <th>Total Price:</th>
                   <td>{total_gst+total_price}</td>
               </tr>
           </table>
        </div>
           
        <br/><br/> 
    </div>
  )
}

export default Bill
