import React from 'react';
import { Link } from "react-router-dom";
//import BannerImage from "../assets/trending-product.png";
import '../styles/home.css'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'


function Home() {

  const setCatId = (catgid) =>{
    console.log("catgid is "+ catgid);
    localStorage.setItem("catg_Id",catgid);

  }
  const setBrandName = (brandname) =>{
    console.log("brandname is "+ brandname);
    localStorage.setItem("brand_name",brandname);

  }
  const setProdItem = ()=>{
    localStorage.removeItem("item");
    localStorage.setItem("item","products")
  }
  
  return (
    <div>
       <div className='home'>
        <div 
          className='headerContainer' 
          // style={{ backgroundImage: url("../assests/products.png") }} 
        >
            <h1> HELLO </h1>
            <p style={{textAlign: "left"}}>Find your Products</p>
            
                <button onClick={setProdItem}><Link to="/products"> ALL PRODUCTS  </Link> </button>
           
        </div>
        
    </div><br></br>
    <h1 className='catghead'>Shop by Category</h1><br></br><br></br>
    <CardGroup>
      
      <Card style={{border:"none",marginLeft:"1%"}}>
      <Link to="/prodbycatg" style={{textDecoration:"none"}} onClick={()=>setCatId(1)}>
    <Card.Img variant="top" style={{borderRadius:"50% 50%",width:"90%",height:"90%", marginLeft:"4%"}} src="https://www.5280market.com/media/wysiwyg/porto/homepage/slider/14/marketslide01.png" />
    <Card.Body>
      <Card.Title style={{textAlign:"center", fontWeight:"bold",color:"black"}}>Grocery and Gourment foods</Card.Title>
    </Card.Body>
    </Link>
  </Card>
      
  <Card style={{border:"none"}}>
  <Link to="/prodbycatg" style={{textDecoration:"none"}} onClick={()=>setCatId(2)}>
    <Card.Img variant="top" style={{borderRadius:"50% 50%",width:"90%",height:"80%", marginLeft:"4%"}} src="https://www.cosmeticsdesign-europe.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/cosmetics/cosmeticsdesign-europe.com/article/2020/10/19/waste-management-in-beauty-can-be-improved-if-brands-add-value-and-step-up-communication-says-certified-sustainable/11863453-1-eng-GB/Waste-management-in-beauty-can-be-improved-if-brands-add-value-and-step-up-communication-says-Certified-Sustainable.jpg" />
    <Card.Body>
      <Card.Title style={{textAlign:"center", fontWeight:"bold",color:"black"}}>Beauty</Card.Title>
    </Card.Body>
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbycatg" style={{textDecoration:"none"}} onClick={()=>setCatId(3)}>
    <Card.Img variant="top" style={{borderRadius:"50% 50%",width:"90%",height:"90%", marginLeft:"4%"}} src="https://www.lifesavvy.com/p/uploads/2020/05/b77cfb22.jpg" />
    <Card.Body>
      <Card.Title style={{textAlign:"center", fontWeight:"bold",color:"black"}}>Household Supplies</Card.Title>
    </Card.Body>
    </Link>
  </Card>
</CardGroup><br></br>
{/* Grocery and Gourment foods */}
<h1 className='catghead'>Shop by Brand</h1><br></br>
<h3 className='brand'>Top Grocery and Gourment foods Brands </h3>
<hr></hr><br></br>
    <CardGroup>
  <Card style={{border:"none",marginLeft:"6%"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("Nutraj")}>
    <Card.Img variant="top" style={{width:"60%",height:"60%", marginLeft:"4%", paddingTop:"10%"}} src="https://ik.imagekit.io/tj2xgqwi7/image/catalog/brandstore/Nutraj/logo/nutrajlogo10.png" />
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("Dabur")}>
    <Card.Img variant="top" style={{width:"60%",height:"60%"}} src="https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Dabur_Logo.svg/1200px-Dabur_Logo.svg.png" />
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("Real")}>
    <Card.Img variant="top" style={{width:"60%",height:"60%",paddingTop:"10%"}} src="https://www.ranklogos.com/wp-content/uploads/2012/09/Real-Fruit-Power-Logo.jpg" />
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("RedLabel")}>
    <Card.Img variant="top" style={{width:"60%",height:"65%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsjXbrKKpmODVohL51htxk2zqFZRluYZ6f_bgPt3YvFin4xTWQVp1oCRxURpVQg86wAeQ&usqp=CAU" />
    </Link>
  </Card>
</CardGroup>
{/* .. -----------------------------*/}
{/* Beauty*/}
<h3 className='brand'>Top Beauty Brands </h3>
<hr></hr><br></br>
<CardGroup>
  <Card style={{border:"none",marginLeft:"6%"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("WOW")}>
    <Card.Img variant="top" style={{width:"60%",height:"60%", marginLeft:"4%"}} src="https://image.pngaaa.com/966/5067966-middle.png" />
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("LAKMÉ")}>
    <Card.Img variant="top" style={{width:"60%",height:"60%"}} src="https://iide.co/wp-content/uploads/2021/09/image4-21-e1631861661803.jpg" />
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("L'Oreal")}>
    <Card.Img variant="top" style={{width:"60%",height:"60%",paddingTop:"4%"}} src="https://logos-download.com/wp-content/uploads/2016/02/Loreal_logo_black.png" />
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("TRESemme")}>
    <Card.Img variant="top" style={{width:"60%",height:"65%"}} src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Tresemme_new_logo.png" />
    </Link>
  </Card>
</CardGroup>
{/* .. -----------------------------*/}
{/* Household Essentials */}
<h3 className='brand'>Top Household Essentials Brands </h3>
<hr></hr><br></br>
<CardGroup>
  <Card style={{border:"none",marginLeft:"6%"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("Harpic")}>
    <Card.Img variant="top" style={{width:"60%",height:"60%", marginLeft:"4%"}} src="https://yt3.ggpht.com/ytc/AKedOLRHZGKKOO2SeUC-4rCJ2jmZ5CVeBKIbecztz3Ti=s900-c-k-c0x00ffffff-no-rj" />
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("Comfort")}>
    <Card.Img variant="top" style={{width:"60%",height:"60%"}} src="https://cdn.sanity.io/images/92ui5egz/production/a3ae4505eed39b1452485407172841c376b8383c-1080x1080.jpg?w=320&h=320&auto=format" />
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("Odonil")}>
    <Card.Img variant="top" style={{width:"60%",height:"60%",paddingTop:"6%"}} src="https://mir-s3-cdn-cf.behance.net/projects/404/0d48b793076511.Y3JvcCw5MDAsNzAzLDAsOTg.jpg" />
    </Link>
  </Card>
  <Card style={{border:"none"}}>
  <Link to="/prodbybrand" style={{textDecoration:"none"}} onClick={()=>setBrandName("Ariel")}>
    <Card.Img variant="top" style={{width:"60%",height:"65%"}} src="https://logodix.com/logo/1279851.jpg" />
    </Link>
  </Card>
</CardGroup>
    </div>
   
  )
}

export default Home;