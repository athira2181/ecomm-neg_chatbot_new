import React, { useState,useEffect } from 'react';
import Axios  from 'axios';
import userpic from '../assets/profileblank.jpg'
import {Row, Col} from 'react-bootstrap'

function ShopProfile() {

    const [sname,setSname] = useState("");
    const [name,setName] = useState("");
    const [uname,setUname] = useState("");
    // const [email,setEmail] = useState("");
    const [addr,setAddr] = useState("");
    const [phno,setPhno] = useState("");

    function showShop(){
        let shop_details = localStorage.getItem('shop_detail');
        if(shop_details){
            return JSON.parse(shop_details);
        }
        else{
            return []
        }
    }
    
    useEffect( ()=>{
        showShop()
    //    user_details()
      },[])

    const shop_update =(e)=>{
        e.preventDefault();
        
     //    setFname(document.getElementById("fname").defaultValue)
     //    setMname(document.getElementById("middlename").defaultValue)
     //    setLname(document.getElementById("lastname").defaultValue)
     //    setAddr(document.getElementById("address").defaultValue)
     //    setPhno(document.getElementById("phno").defaultValue)
        console.log("wow")
        // console.log(lname)
          Axios.post("http://localhost:3002/edit_profile",{
            shop_ID: localStorage.getItem("shop_ID"),
            command: "update_shop",
            sname: sname,
            name: name,
            uname: uname,
            addr: addr,
            phno:phno
        }).then((response)=>{
          console.log([response.data[0]])
          
           localStorage.setItem("shop_detail",JSON.stringify(response.data[0]))
         //   showUser();
        })
       
    }

  return (
    <div className='container emp-profile'>
        <div class="row">
            <div className='col-md-4'>
                 <img src={userpic} alt="profilepic" style = {{width:350,height:350, margin:20, marginTop:100}} />
            </div>
            <div className='col-md-6'>
                 <form onSubmit={shop_update}>
                     <h3>Profile</h3>
                     <br/><br/>
                     <Row md={6}>
                    <Col md={3}><label for="Shopname" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Shop Name:</label></Col>
                    <Col md={8}>
                    <input type="text" class="form-control" defaultValue={showShop().shop_name} onChange={(e)=>{setSname(e.target.value)}}  style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="Shopname" placeholder="Shop Name" />
                    </Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="name" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Name:</label></Col>
                        <Col md={8}><input type="text" defaultValue={showShop().adm_name}  class="form-control" onChange={(e)=>{setName(e.target.value)}} style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="name"  placeholder="Middle Name"/></Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="username" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Username:</label></Col>
                        <Col md={8}><input type="text" class="form-control" value={showShop().username} onChange={(e)=>{setUname(e.target.value)}}  style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="username"  placeholder="Last Name"/></Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="email" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Email:</label></Col>
                        <Col md={8}><input type="email" class="form-control" value={showShop().email}  style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="email"  placeholder="email"/></Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="address" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Shop Address:</label></Col>
                        <Col md={8}><input type="text" class="form-control" defaultValue={showShop().shop_addr} onChange={(e)=>{setAddr(e.target.value)}}  style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="address"  placeholder="address"/></Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="phno" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Phone No.:</label></Col>
                        <Col md={8}><input type="number" class="form-control" defaultValue={showShop().phno} onChange={(e)=>{setPhno(e.target.value)}}  style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="phno"  placeholder="phone no"/></Col>
                    </Row>
                    <br/>
                    <button className='btn btn-primary'>Save</button>
                    <br/><br/>
                  </form>
              </div>
         </div>       
    </div>
  )
}

export default ShopProfile
