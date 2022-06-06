import React, {useEffect, useState} from 'react'
// import Logo from "../assets/logo-social.png";
import { Link,useNavigate } from "react-router-dom";
import Axios from 'axios';

///import ReorderIcon from '@mui/icons-material/Reorder';
// import Button from "@material-ui/core/Button";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
import '../styles/Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping,faUser,faBagShopping} from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const navigate = useNavigate();
  const [count,setCount]= useState("");

  useEffect( ()=>{
    cart_count();
    // refresh()
  },[])
  
  const refresh = ()=>{
    setTimeout(function() {
      // window.location.reload();
      cart_count();
    }, 200)
  }
  
  
  const profile=()=>{
      if(localStorage.getItem("user_id")){
        Axios.post("http://localhost:3002/edit_profile",{
           user_id: localStorage.getItem("user_id"),
           command: "display_user"
       }).then((response)=>{
         console.log([response.data[0]])
          localStorage.setItem("user_detail",JSON.stringify(response.data[0]))
       })
        navigate("/userprofile")
      }
      if(localStorage.getItem("shop_ID")){
        
        Axios.post("http://localhost:3002/edit_profile",{
          shop_ID: localStorage.getItem("shop_ID"),
           command: "display_shop"
       }).then((response)=>{
         console.log([response.data[0]])
          localStorage.setItem("shop_detail",JSON.stringify(response.data[0]))
       })
        navigate("/shopprofile")
      }
  }

  const logout= ()=>{
    localStorage.removeItem("shop_ID");
    localStorage.removeItem("catg_Id");
    localStorage.removeItem("brand_name");
    localStorage.removeItem("product_Details");
    localStorage.removeItem("user_id");
    localStorage.removeItem("pid")
    localStorage.removeItem("price");
    localStorage.removeItem("qnty");
    localStorage.removeItem("item");
    localStorage.removeItem("shop_detail");
    localStorage.removeItem("user_detail");
    navigate("/")
}

const cart_count=()=>{
  
  if(localStorage.getItem("user_id")){
    Axios.post("http://localhost:3002/cart_count",{
     user_id: localStorage.getItem("user_id")
   }).then((response)=>{
    console.log("count",response.data[0].count)
    setCount(response.data[0].count)
  })
  }
   
}

  return (
    <div className="navbar">
        {refresh()}
        <div className='leftSide'>
        <div style={{alignContent:"center",textAlign:"center"}}>
        <FontAwesomeIcon icon={faBagShopping} style={{color: "crimson", width:"25px", height:"25px"}} /><br/>
        <div style={{color:"white",fontFamily:"Lucida Handwriting"}}>ShopHunt</div>
        </div>
        </div>
        <div className='rightSide'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {/* <Link to="/customer">Customer</Link> */}
            <div class="dropdown">
            <button class="dropbtn">Accounts</button>
            <div class="dropdown-content">
            
           <div class="test"><Link to="/logshop">Shopkeeper Login</Link></div>
            <div class="test"><Link to="/loguser" >Customer Login</Link></div>
               
             </div>
             
            </div>
            <Link to="/contact">Contact</Link> &nbsp;
            <Link to="/cart2">
              <button type='button' class="btn btn-primary position-relative">
                <FontAwesomeIcon icon={faCartShopping} style={{color: "white", width:"25px", height:"25px"}} />
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{count}</span>
                </button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="dropdown">
              <button class="dropbtn"><FontAwesomeIcon icon={faUser} style={{color: "white", width:"25px", height:"25px"}} /></button>
            
            <div class="dropdown-content">
            
           <div class="test"><button onClick={profile}>Edit Profile</button></div>
            <div class="test"><button onClick={logout} >Logout</button></div>
               
             </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar;