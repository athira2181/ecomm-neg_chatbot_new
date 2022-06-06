
import { useRef, useState,useEffect } from "react";

import React from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container,Row,Col } from 'react-bootstrap';
import { Button,Form} from 'react-bootstrap' ; 
import 'font-awesome/css/font-awesome.min.css';
import {useForm} from "react-hook-form"
  // States for registration
  function Regisshop() {
    let navigate = useNavigate();
        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
            reset,
            trigger,
          } = useForm();
          const password = useRef();
          password.current = watch("password");
          const onSubmit = (data) => {
              
            Axios.post("http://localhost:3002/handleSubmit", {
                        shop_name:data.shop_name,
                        adm_name:data.admin_name,
                        shop_addr:data.address,
                        email:data.email,
                        password:data.password,
                        phno:data.phone,
                      username:data.username,
                       
                
                      })
                      .then((response) =>{
                        alert("signed");
                        console.log(data);
                        navigate("/logshop");
                      });
                      reset();
      };
//     
return (
  <div className='Appu'>
    
          
          <form onSubmit={handleSubmit(onSubmit)} className='register'>
          <h1 >SHOP REGISTRATION FORM</h1>
           <Row style={{marginLeft:"1%"}}>
          <Col md={5}>
              
              <input
                type="text"
                id="input"
                placeholder='&#xf2bd;Enter your shop name'
                className={`form-contCol ${errors.shop_name && "invalid"}`}
                {...register("shop_name", { required: "Shop Name is Required" })}
                onKeyUp={() => {
                  trigger("shop_name");
                }}
              />
              
              {errors.shop_name && (
                <small className="text-danger">{errors.shop_name.message}</small>
              )}
            
              </Col>
              <Col md={1}></Col>
                <Col md={5}>
              <input
                type="text"
                id="input"
                placeholder="&#xf2bd;Enter your admin name"
                className={`form-contCol ${errors.admin_name && "invalid"}`}
                {...register("admin_name", { required: "Admin Name is Required" })}
                onKeyUp={() => {
                  trigger("admin_name");
                }}
              />
              {errors.admin_name && (
                <small className="text-danger">{errors.admin_name.message}</small>
              )}
             
            </Col>
            </Row> 
            <Row style={{marginLeft:"1%"}}> 
            <Col md={5}>
              
              <input
                type="text"
                id="input"
                placeholder=" &#xf2bd;Enter your User name"
                className={`form-contCol ${errors.username && "invalid"}`}
                {...register("username", { required: "User Name is Required",
             pattern:{
                 value:/^[a-z0-9_-]{3,16}$/i,
                 message: "Invalid username",
             } })}
                onKeyUp={() => {
                  trigger("username");
                }}
              />
              {errors.username && (
                <small className="text-danger">{errors.username.message}</small>
              )}
          
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              
              <input
                type="text"
                id="input"
                placeholder=" &#xf0e0; Enter your email"
                className={`form-contCol ${errors.email && "invalid"}`}
                {...register("email", { required: "Email is Required" ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }})}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
           
            </Col>
            </Row>
            <Row style={{marginLeft:"1%"}}>
            <Col md={5}>
              
              <input
                type="number"
                id="input"
                placeholder="&#xf095;Enter your phone number" 
                className={`form-contCol ${errors.phone && "invalid"}`}
                {...register("phone", { required: "Phone is Required",
                pattern: {
                  value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                  message: "Invalid phone no",
                },
               })}
               onKeyUp={() => {
                trigger("phone");
              }}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
           
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              
              
              
           <input
                type="password"
                id="input"
                placeholder=" &#xf0e0; Enter your password"
                className={`form-contCol ${errors.password && "invalid"}`}
                {...register("password", { required: "Password is Required" ,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i,
                  message: "weak password",
                }})}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
           
           </Col>
           </Row>
           <Row style={{marginLeft:"1%"}}>
           <Col md={5}>
              
              <input
                type="password"
                id="input"

                placeholder=" &#xf0e0; Re-Enter your password"
                className={`form-contCol ${errors.cpassword && "invalid"}`}
                {...register("cpassword", { required: "Password is Required" ,
                validate: (value) =>
                value === password.current,
                })}
                onKeyUp={() => {
                  trigger("cpassword");
                }}
              />
              {(errors.cpassword && errors.cpassword.type === "validate")&&(
                <small className="text-danger">{"passwords donot match"}</small>
              )}
            </Col>
            <Col md={1}></Col>
             <Col md={5}>              
              <input type ="text"
              id="input"
               placeholder='&#xf041;Enter your shop address'
                className={`form-contCol ${errors.address && "invalid"}`}
                {...register("address", { required: "Address is Required",
                minLength: {
                  value: 10,
                  message: "Minimum Required length is 10",
                },
                maxLength: {
                  value: 170,
                  message: "Maximum allowed length is 170 ",
                }
               })}
               onKeyUp={() => {
                trigger("address");
              }}
              />
              {errors.address && (
                <small className="text-danger">{errors.address.message}</small>
              )}
            </Col>
            </Row>
            <input
              type="submit"

              className="btn btn-primary my-3"
              value="SUBMIT"
            />
            <div className='linko'>
       <Link to="/Logshop">ALDREADY REGISTERED GO TO LOGIN PAGE</Link>
       </div>
       </form>
            
          </div>
         
          
         
        
      
  );
}
export default Regisshop;