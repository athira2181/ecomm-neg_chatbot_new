import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {Container,Row ,Card, Col, Button} from 'react-bootstrap';

const Messages = () => {

    const messages = useSelector(state => state.chatbot.messages)
    // console.log("messages", messages);
    let navigate = useNavigate();
    const item_display = (message)=>{
        let df_intent = message.intent
        localStorage.setItem("item",message.item)
        if(df_intent== "product_search"){
            return <button type='submit' class="prod_btn">
                <Link to="/products">{message.item}</Link>
            </button>
            // return navigate('/products')
        }
    }

    const displayMessage = (message, index)=>{
        if(message.speak == "user"){
            return  <div key={index} class ="messages_user">
                        <div class ="messages_text_user">{message.text}</div>
                    </div>
        }
        else if (message.speak == "bot"){
            return <div>
                <div key={index} class="messages_df">
                        <div class="messages_text_df">{message.text}</div>
                    </div>
                    <div>{item_display(message)}</div>
            </div>
             
        }
        else if (message.speak == "nego"){
            return <div>
                <div key={index} class="messages_neg">
                        <div class="messages_text_neg">
                            <Card className='box' key={message.pid}>
                            <Card.Header className="negneg" style={{fontSize: "14px", fontWeight: "bolder", fontFamily:"serif", backgroundColor:"rgba(220, 20, 60, 0.608)", borderTopRightRadius: "0.8rem",
    borderTopLeftRadius: "0.8rem"}}>
                                {message.p_name}
                            </Card.Header>
                            <Card.Img  variant="top" src={message.img} style={{ maxWidth: "190px"}}/>
                            <Card.Body style={{ fontFamily: "serif", backgroundColor:"rgba(220, 20, 60, 0.608)",borderBottomRightRadius: "0.8rem"}}>
                            
                            <Card.Title>₹ {message.price}</Card.Title>
                            <Card.Subtitle>{message.brand} </Card.Subtitle>
                            <Card.Text style={{fontSize: "16px", textAlign: "left"}}>Sold by: {message.shop_name}</Card.Text>
                            </Card.Body>
                            </Card>
                        </div>
                    </div>
                    
            </div>
             
        }
        
    }

    return(
        <div class="messages"> 
            {
                messages.map((message, index)=> {
                return displayMessage(message, index)
            })}
        </div>
    )
}

export default Messages