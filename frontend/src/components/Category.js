import React from 'react'
import '../styles/Category.css'
import {Link } from "react-router-dom"
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
// import Container from 'react-bootstrap/Container'

function Category() {
  const setCatId = (catgid) =>{
    console.log("catgid is "+ catgid);
    localStorage.setItem("catg_Id",catgid);

  }
  return (
    // style={{height:"2.5rem",backgroundColor:"#eebe40"}}
    <div>
      {/* <Navbar collapseOnSelect  expand="lg" style={{backgroundColor:"#eebe40",height:"3rem"}} variant="dark">
  <Container style={{backgroundColor:"#eebe40"}}>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav>
      <Nav.Link href="#features" className='catg' style={{color:"black"}}>Grocery and Gourment foods</Nav.Link>
      <Nav.Link href="#pricing" className='catg'style={{color:"black"}}>Beauty</Nav.Link>
      <Nav.Link href="#pricing" className='catg'style={{color:"black"}}>Household Supplies</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar> */}
      <nav>
      <Link to='/prodbycatg' onClick={()=>setCatId(1)}>Grocery and Gourment foods</Link>
      <Link to='/prodbycatg' onClick={()=>setCatId(2)}>Beauty</Link>
      <Link to='/prodbycatg' onClick={()=>setCatId(3)}>Household Supplies</Link>
      </nav>
    </div>
  )
}

export default Category
