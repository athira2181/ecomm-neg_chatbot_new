import React, { useState } from "react";
import "../styles/sample.css"
import Plane from "../assets/paper-plane.png"
import Close from "../assets/close.png"
import Chat from "../assets/chat.png"
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import * as chatbotActions from '../store/actions/chatbotActions'

function Chatbot(){
  
//   const [responses, setResponses] = useState([])
  const [msg,setMsg]=useState("");
  
  const dispatch = useDispatch()
  const openForm = (e) =>{
    document.getElementById("notif").style.display = "none";
    document.getElementById("chat-wrapper").style.minHeight= "550px";
    document.getElementById("chat-wrapper").style.opacity= "1";
    document.getElementById("chat-wrapper").style.transform= "translate3d(0px, 0px, 0px) scale(1, 1)";
    document.getElementById("chat-wrapper").style.transition= "transform 0.8s ease, opacity 0.8s ease-in"; 
    // console.log("hi");
}

const closeForm = (e)=>{
    document.getElementById("chat-wrapper").style.minHeight= "0";
    document.getElementById("chat-wrapper").style.opacity= "0";
    document.getElementById("chat-wrapper").style.transform= "translateX(25%) translateY(35%) scale(0.5, 0.5)";
    document.getElementById("chat-wrapper").style.transition= "transform 0.8s ease, opacity 0.8s ease-in, height 0s ease 0.8s"; 
}
const notification = (e) =>{
  document.getElementById("notif").style.display = "inline-flex";
  document.getElementById("notif").classList.toggle('visible');
}
// //to close notification
const closeNotif = (e) =>{
  
  document.getElementById("notif").style.display = "none";
}

//to send data to backend
const chat =  (e) => {
    // console.log("hi")
  //stop the form from refreshing the page on submit
  e.preventDefault();

  //clear the input box
  setMsg('')
//   setUser(msg)
    // Axios.post("http://localhost:3001/chat_in",{msg:msg})
    // .then((response) => console.log(response.data))
    // .catch((error) => console.log(error));
    const data = {
        command: "other",
        text: msg,
        pid: ""
    }
    dispatch(chatbotActions.textQueryAction(data))
}


    return(
      <div>
      <button class="open-button" onClick={openForm} onLoad={notification}><img src={Chat}/></button>
      <div id="notif">
     <div id="close" onClick={closeNotif}>
         {/* <img src={Close} class="close-notif" /> */}
         </div>
      </div>
        <div id="chat-wrapper">
            <div class="titlebar">
                <div class="title-wrapper">
                    <div id="dfTitlebar">Chatbot</div>
                    <div id="close" onClick={closeForm}><img src={Close} class="close-form" /></div>
                </div>
            </div>
            <div class="message-list">
                <div class="message-list-wrapper">
                    <div class="error"></div>
                    <div id="messageList">
                        <Messages />
                    </div>
                </div>
            </div>
            <div class="user-input">
                <div class="input-container">
                    <div class="check-input"></div>
                    <form class="input-box-wrapper" onSubmit={chat}>
                        <input type="text"  placeholder="Ask something...." value={msg} required onChange={(e)=> {setMsg(e.target.value);}}></input>
                        <button type="submit" ><img src={Plane} id="sendIcon"></img></button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Chatbot