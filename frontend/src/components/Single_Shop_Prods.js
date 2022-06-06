import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {Link } from "react-router-dom"
import '../styles/Single_shop_prods.css'
import Button from 'react-bootstrap/Button'
import { BiUserCircle, BiRupee } from "react-icons/bi";
import { FaPlus, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
// import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Category from './Category'

function Products() {
  let [adm_name , getAdmin] = useState("");
  let [shop_name , getShopName] = useState("");
  let [products , showProducts] = useState([]);

  useEffect( () =>{
    getAdminInfo(); 
    getProducts();
  } , [] )

  const getAdminInfo = ()=> {
    let shopid = localStorage.getItem('shop_ID')
    Axios.get("http://localhost:3002/vendor/getshopadminfo/"+shopid)
    .then((response)=>{
      // console.log(response);
      let shopinfo = response.data.result[0];
      let username = shopinfo.username;
      let shopname = shopinfo.shop_name;
      getAdmin(username);
      getShopName(shopname)
      // console.log(username);
    })
  }

  const getProducts = () =>{
    let shopid = localStorage.getItem('shop_ID');
    Axios.get("http://localhost:3002/vendor/getproducts/"+shopid)
    .then((response)=>{
      let resp= response.data.result;
      console.log(resp);
      showProducts(resp);
    })
  }
  const setProd = (prod)=> {
    localStorage.setItem('product_Details',JSON.stringify(prod));
  }
  const deleteProd = (product)=> {
    let prodid = product.pid;
   if( window.confirm('Are you sure want to delete this item?')){
    Axios.delete("http://localhost:3002/vendor/deleteproduct/"+prodid)
    .then((response)=>{
      window.location.reload(false);
      products = products.filter(p => p !== product);
    })
   }
  }
  // const deleteProd = (prod)=> {
  //   window.confirm('Are you sure you want to delete this item?');
  // } 
  // const [addcart, setaddcart] = useState(1);
  // const [heart, setheart] = useState(true);

  // const AddCart = ()=>{
  //   if(addcart<10) {
  //     setaddcart(addcart+1);
  //   }
  // };
  // const DecBag =() =>{
  //   if(addcart>=1){
  //     setaddcart(addcart-1);
  //   }
  // };
  // const Heart=()=>{
  //   if(heart){
  //     setheart(false);
  //   }
  //   else{
  //     setheart(true);
  //   }
  // }

  return (
    <div>
      <div  style={{float:'right'}}>
      <BiUserCircle style={{fontSize: '30px'}} />
      <span style={{ fontSize: '20px' ,paddingRight: '50px'}}>{adm_name}</span>
      </div>
      <Category/>
      {/* <div className='shpname' style={{fontSize:'40px',textAlign:'center', textTransform:'uppercase'}}>
        <div id='shp'>{shop_name}</div>
      </div> */}
      <div >
        <div id='shp' style={{paddingTop:"6%"}}>{shop_name}</div>
      </div>
      <br></br>
      <div style={{paddingLeft:"25%",marginRight:"30%"}}>
      {/* <Button variant="contained" color="success" startIcon={<AddIcon />}>
          <Link style={{color:'white',textDecoration:'none'}} to = "/addproduct">ADD PRODUCT</Link>
      </Button> */}
      <div className="d-grid">
        <Button  variant="success" size="lg"><FaPlus style={{marginBottom:"6px",marginRight:"10px"}}/>
        <Link style={{color:'white',textDecoration:'none'}} to = "/addproduct">ADD PRODUCT</Link>
        </Button>
      </div>
      </div>
      <br></br>
      {/* <Table striped bordered hover responsive style={{width:"80%", marginLeft:"10%"}}>
  <thead>
    <tr>
      <th>product name</th>
      <th>price</th>
    </tr>
  </thead>
  <tbody>
    
    {products.map((product=>
      <tr key={product.pid}>
      <td>{product.p_name}</td>
      <td>{product.price}</td>
    </tr>
    ))}
    
  </tbody>
</Table> */}

        <Row xs={2} md={4} className="g-4" style={{marginLeft:"30px", marginRight:"30px"}}>
  {products.map((product => 
    <Col>
      <Card key={product.pid}  className="box" style={{backgroundColor:"rgb(238 190 64 / 17%)",border: "1px solid #82837f73"}}>
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
                    </div>
                    <Row>
                      <Col md={5}><Link to='/editproduct' onClick={()=>setProd(product)} ><Button className='butto' style={{backgroundColor:"rgb(76, 132, 76)",border:"none"}}><FaEdit/>&nbsp;EDIT</Button></Link></Col>
                      <Col md={2}></Col>
                      <Col md={5}><Button className='butto' onClick={()=>deleteProd(product)} style={{backgroundColor:"#de3131",border:"none"}}><MdDelete/>&nbsp;DELETE</Button></Col>
                    </Row>
                    {/* <div className="description">
                    <Card.Text>Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy textLorem Ipsum is simply dummy textLorem Ipsum is simply dummy text.</Card.Text>
                    </div> */}
                    {/* <Card.Body className="last_section">
                      <Button onClick={AddCart}> Add to cart</Button>
                        <div className="heart">
                            <i onClick={Heart}>{heart ? <BsHeart/> : <BsHeartFill/>}</i>
                        </div>
                    </Card.Body> */}
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

export default Products
