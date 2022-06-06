import React, { useState,useEffect } from 'react';
import Axios  from 'axios';
import userpic from '../assets/profileblank.jpg'
import {Row, Col} from 'react-bootstrap'

function UserProfile() {
    const [fname,setFname] = useState("");
    const [mname,setMname] = useState("");
    const [lname,setLname] = useState("");
    // const [email,setEmail] = useState("");
    const [addr,setAddr] = useState("");
    const [phno,setPhno] = useState("");

    
    function showUser(){
        let user_details = localStorage.getItem('user_detail');
        if(user_details){
            return JSON.parse(user_details);
        }
        else{
            return []
        }
  }
    useEffect( ()=>{
        showUser()
    //    user_details()
      },[])

   const user_update =(e)=>{
       e.preventDefault();
       
    //    setFname(document.getElementById("fname").defaultValue)
    //    setMname(document.getElementById("middlename").defaultValue)
    //    setLname(document.getElementById("lastname").defaultValue)
    //    setAddr(document.getElementById("address").defaultValue)
    //    setPhno(document.getElementById("phno").defaultValue)
       console.log("wow")
       console.log(lname)
         Axios.post("http://localhost:3002/edit_profile",{
           user_id: localStorage.getItem("user_id"),
           command: "update_user",
           fname: fname,
           mname: mname,
           lname: lname,
           addr: addr,
           phno:phno
       }).then((response)=>{
         console.log([response.data[0]])
         
          localStorage.setItem("user_detail",JSON.stringify(response.data[0]))
        //   showUser();
       })
      
   }

  return (
    <div className='container emp-profile'>
        {/* {user_details} */}
        <div class="row">
            <div className='col-md-4'>
                 <img src={userpic} alt="profilepic" style = {{width:350,height:350, margin:20, marginTop:100}} />
            </div>
            <div className='col-md-6'>
                 <form onSubmit={user_update}>
                     <h3>Profile</h3>
                     <br/><br/>
                     <Row md={6}>
                    <Col md={3}><label for="firstname" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>First Name:</label></Col>
                    <Col md={8}>
                    <input type="text" class="form-control" defaultValue={showUser().first_name} id="fname" onChange={(e)=>{setFname(e.target.value)}} style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} placeholder="First Name" />
                    </Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="middlename" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Middle Name:</label></Col>
                        <Col md={8}><input type="text" class="form-control" defaultValue={showUser().middle_name} onChange={(e)=>{setMname(e.target.value)}} style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="middlename"  placeholder="Middle Name"/></Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="lastname" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Last Name:</label></Col>
                        <Col md={8}><input type="text" class="form-control" defaultValue={showUser().last_name} onChange={(e)=>{setLname(e.target.value)}} style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="lastname"  placeholder="Last Name"/></Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="email" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Email:</label></Col>
                        <Col md={8}><input type="email" class="form-control" value={showUser().email} style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="email"  placeholder="email"/></Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="address" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Address:</label></Col>
                        <Col md={8}><input type="text" class="form-control" defaultValue={showUser().home_addr} onChange={(e)=>{setAddr(e.target.value)}} style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="address"  placeholder="address"/></Col>
                    </Row>
                    <br/>
                    <Row md={6}>
                        <Col md={3}><label for="phno" style={{fontWeight: "bold", fontFamily: "FontAwesome"}}>Phone No.:</label></Col>
                        <Col md={8}><input type="number" class="form-control" defaultValue={showUser().phno} onChange={(e)=>{setPhno(e.target.value)}} style={{border: "none", borderBottom: "1px solid black", borderRadius:"0px"}} id="phno"  placeholder="phone no"/></Col>
                    </Row>
                    <br/>
                    <button type='submit' className='btn btn-primary'>Save</button>
                    <br/><br/>
                  </form>
              </div>
         </div>       
    </div>
  )
}

export default UserProfile