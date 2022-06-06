import React from 'react'
import {Container,Row ,Card, Col, Button} from 'react-bootstrap';

function Cart() {
  return (
    <div style={{position: "relative"}}>
      <Container className='p-4'>
          <Row>
        
                <Card>
                    <Row >
                    <Col md={2}>
                <div style={{display:"flex",justifyContent:"start", alignItems:"center"}}>
                  <Card.Img class="img" variant="top" src="https://m.media-amazon.com/images/I/617SMwcS4HS._AC_UL480_FMwebp_QL65_.jpg" style={{height:"180px"  }}/>
                </div>
            </Col>
            <Col md={10}>    
                <Card.Body><Row>
                <Col md={8}>
              <div class="card-text-body" >
              <Card.Title>Product</Card.Title>
            <Card.Subtitle>
                <Col>Brand</Col>
              
              </Card.Subtitle>
            <Card.Text>
            {/* <Row md={2}  style={{margin:"2px"}}> */}
            {/* <Col>₹{prod.price}</Col> */}
            {/* <Col md={{offset: -2}}><Button variant="success">Negotiate</Button></Col>
            </Row> */}
              
            </Card.Text>
            <Row md={2}  style={{marginTop:"7%"}}>
            <Col><Button variant="primary">Buy Now</Button></Col>
            {/* <Col md={{offset: -2}}><Button variant="warning" >Add to Cart</Button></Col> */}
            </Row>
            
              </div>
              </Col>
              <Col md={3}>
                  <Row  className="d-flex mb-4">
                   <Col ><Button className='btn btn-primary px-3 ms-2' onclick="this.parentNode.querySelector('input[type=number]').stepDown()">-
                     </Button></Col>
                   {/* <Col sm={1}><Button variant='dark' className='btn-outline-dark' disabled>1</Button></Col>
                    */}
                    <Col class="form-outline">
                    <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control" />
                    <label class="form-label" for="form1">Quantity</label>
                  </Col>
                   <Col><Button class="btn btn-primary px-3 ms-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()" >+</Button></Col>   
                 </Row>        
             </Col></Row>
            </Card.Body>
            </Col>
            </Row>
                </Card>
            
          </Row>
      </Container>
    </div>
  )
}

export default Cart
