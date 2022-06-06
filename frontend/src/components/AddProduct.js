import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'
import '../styles/AddProduct.css'
import Form from 'react-bootstrap/Form'
// import Button from '@mui/material/Button';
import Button from 'react-bootstrap/Button'
import { FaPlus } from "react-icons/fa";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
import { FormGroup } from '@mui/material';
import imgplacehold from "../assets/image_placeholder.jpg";
import Image from 'react-bootstrap/Image'

function AddProduct() {
    let navigate = useNavigate();
    const [productname, setProductrnameReg] = useState("");
    const [price, setPrice] = useState();
    const [minprice, setMinPrice] = useState();
    const [image, setImage] = useState("");

    const [catg, setCatg] = useState("default");
    console.log(catg);

    const [val, setVal] = useState("default");
    console.log("val is " +val);

    const [subcategory, setSubCatg] = useState("");
    // console.log(subcategory);
    
    const [showimg,showImg] =useState(imgplacehold);
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState();
    const [descriptn, setDescriptn] = useState("");

    var options=[];
    var opt = "";
    var maincatg = "";

    switch(catg){
      case '1' : 
        maincatg = "Grocery and Gourment foods"
        opt = "--Select--"
        options = [ { name: "Bevarages", id: 1 },
                    { name: "Dried fruits and Seeds", id: 2 },
                    { name: "Spices and Masalas", id: 3 }
                  ];
        break;
      case '2' : 
        maincatg = "Beauty"
        opt = "--Select--"
        options = [ { name: "Skincare", id: 4 },
                    { name: "Haircare", id: 5 },
                    { name: "Makeup", id: 6 }
                  ];
        break;
      case '3' : 
        maincatg = "Household Supplies"
        opt = "--Select--"
        options = [ { name: "Laundary Essentials", id: 7 },
                    { name: "Household Cleaners", id: 8 },
                    { name: "Air Freshners", id: 9 }
                  ];
        break;
      default: 
        opt = "--Please select a Category--"  
    }
    // console.log(maincatg);

    const addProduct = (e)=> {
        let shopid = localStorage.getItem('shop_ID');
      e.preventDefault();
      Axios.post("http://localhost:3002/vendor/addproduct", {
        shopid: shopid,
        prodname: productname,
        price: price,
        minprice: minprice,
        image: image,
        category: catg,
        subcategory: val,
        brand: brand,
        quantity: quantity,
        description: descriptn
      })
      .then((response) =>{
        alert("product added");
        console.log(response);
        navigate("/single_shop_prods");
      });
    };

  return (
    <div style={{backgroundColor:"beige"}}>
        <Form onSubmit={addProduct} className="formsty">
          <Row style={{marginLeft:"40%",marginBottom:"20px", fontSize:"2.5rem", wordSpacing:"10px",letterSpacing:"0px"}}>ADD PRODUCT</Row>
          <Row>
            <Col xs={12} md={3}>
              {/* <img src={showimg} className="imgstyle" alt='Not available'/> */}
              <Image src={showimg} fluid="true" className="imgstyle" style={{height:"23rem",width:"22rem"}} alt='Not available'/>
              </Col>
            <Col xs={12} md={8}>
        
          <Form.Group className="mb-3 grp" controlId="formBasicEmail" style={{paddingTop:"3%"}}>
            <Row>
              <Col xs={6} md={2}><Form.Label>Product Name</Form.Label></Col>
              <Col xs={11} md={10}><Form.Control type="text" placeholder="Enter product name"  style={{backgroundColor:"rgb(36 35 35)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}
              value={productname} onChange={(e)=>{setProductrnameReg(e.target.value)}}/></Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 grp" controlId="formBasicEmail">
            <Row>
              <Col xs={4} md={2}><Form.Label>Price</Form.Label></Col>
              <Col xs={7} md={4}><Form.Control type="number" placeholder="Enter price of product" style={{backgroundColor:"rgb(36 35 35)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}
              value={price} onChange={(e)=>{setPrice(e.target.value)}}/></Col>
              <Col xs={4} md={2}><Form.Label>Min-Acceptable Price</Form.Label></Col>
              <Col xs={7} md={4}><Form.Control type="number" placeholder="Enter min-acceptable price of product" style={{backgroundColor:"rgb(36 35 35)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}
              value={minprice} onChange={(e)=>{setMinPrice(e.target.value)}}/></Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 grp" controlId="formBasicEmail">
            <Row>
              <Col xs={6} md={2}><Form.Label>Choose Image Url</Form.Label></Col>
              <Col xs={11} md={10}><Form.Control type="text" placeholder="Paste the Image Url here" style={{backgroundColor:"rgb(36 35 35)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}
              value={image} onChange={(e)=>{setImage(e.target.value);showImg(e.target.value)}}/></Col>
            </Row><br></br>
            
          </Form.Group>
          <FormGroup className='mb-3 grp'>
            <Row>
              <Col xs={4} md={2}><Form.Label>Select a Category</Form.Label></Col>
              <Col xs={7} md={4}>
              <Form.Select value={catg} onChange={(e)=>setCatg(e.target.value)} aria-label="Default select example" style={{backgroundColor:"rgb(105 102 102)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}>
                <option value="default" disabled hidden>--Select--</option>
                <option value="1">Grocery and Gourment foods</option>
                <option value="2">Beauty</option>
                <option value="3">Household Supplies</option>
              </Form.Select>
              </Col>
              <Col xs={4} md={2}><Form.Label>Select a Sub-Category</Form.Label></Col>
              <Col xs={7} md={4}>
              <Form.Select value={val} onChange={(e)=>{setVal(e.target.value); setSubCatg(e.target.options[e.target.selectedIndex].text)}} aria-label="Default select example" style={{backgroundColor:"rgb(105 102 102)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}>
              <option value="default" disabled hidden>{opt} </option>
                {options.map((o =>
                   <option value={o.id} key={o.id}>{o.name}</option>
                ))}
              </Form.Select>
              </Col>
            </Row>
          </FormGroup>
          <Form.Group className="mb-3 grp" controlId="formBasicEmail">
            <Row>
              <Col xs={4} md={2}><Form.Label>Brand</Form.Label></Col>
              <Col xs={7} md={4}><Form.Control type="text" placeholder="Enter the brand name" style={{backgroundColor:"rgb(36 35 35)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}
              value={brand} onChange={(e)=>{setBrand(e.target.value)}}/></Col>
              <Col xs={4} md={2}><Form.Label>Quantity</Form.Label></Col>
              <Col xs={7} md={4}><Form.Control type="number" placeholder="Enter the quantity of product" style={{backgroundColor:"rgb(36 35 35)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}
              value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/></Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3 grp" controlId="formBasicEmail" style={{paddingTop:"3%"}}>
            <Row>
              <Col xs={6} md={2}><Form.Label>About this item</Form.Label></Col>
              <Col xs={11} md={10}><Form.Control as='textarea' placeholder="Enter the product description"  style={{backgroundColor:"rgb(36 35 35)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}
              value={descriptn} onChange={(e)=>{setDescriptn(e.target.value)}}/></Col>
            </Row>
          </Form.Group>
          </Col>
          <div style={{paddingLeft: "30%"}}>
          {/* <Button variant="contained" type='submit' color="success" className='but' startIcon={<AddIcon />}>ADD</Button> */}
          <Button  variant="success" size="lg" type='submit' className='but'><FaPlus style={{marginBottom:"6px",marginRight:"10px"}}/>ADD</Button>
          </div>
          </Row>
          <br></br>
        </Form> 
    </div>
  )
}

export default AddProduct
