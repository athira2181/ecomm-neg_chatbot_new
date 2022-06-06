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
// import imgplacehold from "../assets/image_placeholder.jpg";
import Image from 'react-bootstrap/Image'

function EditProduct() {

    let navigate = useNavigate();

        function editProd(){
            let prod_details = localStorage.getItem('product_Details');
            if(prod_details){
                return JSON.parse(prod_details);
            }
            else{
                return []
            }
      } 
    const  [showsubcat,subCatgdisplay] =useState(subcatgName());
    // const  [datadisplay,dataDisplay] =useState([]);
    
    // var data = [];
      function subcatgName(){
        Axios.get("http://localhost:3002/vendor/getsubcatgname/"+editProd().subcatg_id)
    .then((response)=>{
      if(response){
        var data =JSON.stringify(response.data.result[0]["subcatg_name"]).replaceAll('"', '');
        subCatgdisplay(data);
        // var data =JSON.stringify(response.data.result[0]);
        // console.log("response is " +JSON.parse(data));
        // return JSON.parse(data);
      }
      
    })
    // Axios.get("http://localhost:3001/getsubcatgname/"+editProd().catg_id)
    // .then((response)=>{
    //   if(response){
    //     var data = response.data.result;
    //     dataDisplay(data);
    //     for(var i=0;i<data.length;i++){
    //       if(data[i]["subcatg_id"]==editProd().subcatg_id){
    //         var catname = data[i]["subcatg_name"];
    //         subCatgdisplay(catname);
    //       }
    //     }
    //   }
      
    // })
  }
  // console.log(data);
    const [productname, setProductrnameReg] = useState(editProd().p_name);
    const [price, setPrice] = useState(editProd().price);
    const [minprice, setMinPrice] = useState(editProd().minprice);
    const [image, setImage] = useState(editProd().img);

    const [catg, setCatg] = useState(editProd().catg_id);
    // console.log(catg);
    var hi=editProd().subcatg_id;
    const [val, setVal] = useState(editProd().subcatg_id);
    // console.log("val is " +val);
    
    const [showimg,showImg] =useState(editProd().img);
    const [brand, setBrand] = useState(editProd().brand);
    const [quantity, setQuantity] = useState(editProd().qnty);
    const [descriptn, setDescriptn] = useState(editProd().description);
    

    var options=[];

    switch(catg){
      case '1' : 
        options = [ { subcatg_name: "Bevarages", subcatg_id: 1 },
                    { subcatg_name: "Dried fruits and Seeds", subcatg_id: 2 },
                    { subcatg_name: "Spices and Masalas", subcatg_id: 3 }
                  ];
        break;
      case '2' : 
        options = [ { subcatg_name: "Skincare", subcatg_id: 4 },
                    { subcatg_name: "Haircare", subcatg_id: 5 },
                    { subcatg_name: "Makeup", subcatg_id: 6 }
                  ];
        break;
      case '3' : 
        options = [ { subcatg_name: "Laundary Essentials", subcatg_id: 7 },
                    { subcatg_name: "Household Cleaners", subcatg_id: 8 },
                    { subcatg_name: "Air Freshners", subcatg_id: 9 }
                  ];
        break;
      default: 
        options = [];  
            // options = [{name: datadisplay[i]["subcatg_name"], id: datadisplay[i]["subcatg_id"]}];
            
        
    }

    const UpdateProduct = (e)=> {
        let prodid = localStorage.getItem('product_Details');
        let prod_id = JSON.parse(prodid).pid;
      e.preventDefault();
      Axios.put("http://localhost:3002/vendor/updateproduct", {
        prod_id: prod_id,
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
        alert("product updated");
        console.log(response);
        navigate("/single_shop_prods");
      });
    };

  return (
    <div style={{backgroundColor:"beige"}}>
        <Form onSubmit={UpdateProduct} className="formsty">
        <Row style={{marginLeft:"40%",marginBottom:"20px", fontSize:"2.5rem",wordSpacing:"10px",letterSpacing:"0px"}}>EDIT PRODUCT</Row>
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
              <Form.Select value={val} onChange={(e)=>{setVal(e.target.value)}} 
              onLoad={(e)=>{subCatgdisplay(e.target.value)}} aria-label="Default select example" style={{backgroundColor:"rgb(105 102 102)",border:"none", borderBottom:"2px solid rgb(233 212 194)",color:"beige"}}>
              <option value={hi} disabled hidden>{showsubcat} </option>
                {options.map((o =>
                   <option value={o.subcatg_id} key={o.subcatg_id}>{o.subcatg_name}</option>
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
          <Button  variant="success" size="lg" type='submit' className='but'><FaPlus style={{marginBottom:"6px",marginRight:"10px"}}/>UPDATE</Button>
          </div>
          </Row>
          <br></br>
        </Form> 
    </div>
  )
}

export default EditProduct

