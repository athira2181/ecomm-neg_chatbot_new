import React, {useEffect,useState} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container,Row ,Card, Col, Button, Navbar} from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom"
// import '../styles/displayProd.css'
// import { Crefresh } from './Navbar'
import Axios from 'axios'


function DisplayProduct() {

  let [prods,setProducts]= useState([]);
  let navigate = useNavigate();
  let [disabled , showDisabled] = useState();
    
    const userLoggedin = ()=>{
      if(localStorage.getItem("user_id")){
        showDisabled(false)
      }
      else{
        showDisabled(true)
      }
    }
  // const [p_name,setProd_name]=useState("");
  // const [price,setPrice]= useState("")
  // const [img,setImg]=useState("");
  // const [brand,setBrand]= useState("")
  // const [description,setDesc]=useState("");
  // const [catg_name,setCat]=useState("");
  // const [subcatg_name,setSubCat]= useState("")
  useEffect( ()=>{
    
    userLoggedin();
    prod_display()
  },[])


  
  function refreshPage(){
    <div>{prod_display()}</div>
  }
  const prod_display = ()=>{
    const item_n = localStorage.getItem("item");
    console.log("local",item_n);
    Axios.post("http://localhost:3002/displayProd",{
      item: item_n 
    }).then((response)=>{
      setProducts(response.data)
      localStorage.setItem("item","products")
      // console.log(prods[2].p_name)
      // card_display(prod)
    })
    
        // card_display(prod[i]);
      
  }

  const setProd = (prod)=> {
    localStorage.setItem('product_Details',JSON.stringify(prod));
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



  } 

  const itemRemove = ()=>{
    localStorage.removeItem("pid");
    localStorage.removeItem("qnty");
    localStorage.removeItem("price")
  }

  return (
    <div class="grid" style={{position: "relative", minHeight: "650px"}}>
      <div style={{fontFamily:"serif",fontWeight: "bold", fontSize:"24px", borderRadius:"25px" }}>Showing Results for "{localStorage.getItem("item")}" ({prods.length})
        <Button variant='light' onClick={refreshPage}>Reload</Button>
      </div>
      {/* <Container className='p-4'> */}
        <Row xs={2} md={4} className="g-4" style={{marginLeft:"30px", marginRight:"30px"}}>
        {prods.map((prod=>
          <Col>
            <Card key={prod.pid} className="box" style={{backgroundColor:"rgb(238 190 64 / 17%)",border: "1px solid #82837f73",marginBottom:"0px",paddingBotton:"0px"}}>
              {/* <div style={{display:"flex",justifyContent:"center", alignItems:"center"}}> */}
              <Link to="/productdetail" onClick={()=>setProd(prod)}style={{textDecoration:"none",color:"black"}}>
            <Card.Img  variant="top" src={prod.img} /></Link>
            {/* </div> */}
            {/* <Card.Body > */}
              {/* <div class="card-text-body" > */}
              <Card.Body>
              <Link to="/productdetail" onClick={()=>setProd(prod)}style={{textDecoration:"none",color:"black"}}>
                
              <Card.Title>{prod.p_name}</Card.Title></Link>

            <Card.Subtitle>
                <Col>{prod.subcatg_name}</Col>
              
              </Card.Subtitle>
            <Card.Text>
            <Row md={2}  style={{margin:"2px"}}>
            <Col>₹{prod.price}</Col>
            <Col md={{offset: -2}}><Button disabled={disabled} style={{backgroundColor:"rgb(93 56 54)",border:"none"}}>Negotiate</Button></Col>
            </Row>
              
            <Card.Body className='last_section' style={{marginTop: "0px"}}>
            <Button disabled={disabled} style={{backgroundColor:"#c05e38", border: "none"}}>Buy Now</Button>
            <Button disabled={disabled} onClick={()=>addtoCart(prod)} style={{backgroundColor:"#e07b3c"}}>Add to Cart</Button>
            </Card.Body>
            </Card.Text>
            
              {/* </div> */}
            </Card.Body>
            </Card>
          </Col>))}
          </Row>
      {/* </Container> */}
      
    </div>
  )
}

export default DisplayProduct
