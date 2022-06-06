import React from "react";
import "../styles/sample.css"
import Plane from "../assets/paper-plane.png"

function Sample(){

    return(
        <div class="chat-wrapper" >
            <div class="titlebar">
                <div class="title-wrapper">
                    <div id="dfTitlebar">Chatbot</div>
                </div>
            </div>
            <div class="message-list">
                <div class="message-list-wrapper">
                    <div class="error"></div>
                    <div id="messageList"></div>
                </div>
            </div>
            <div class="user-input">
                <div class="input-container">
                    <div class="check-input"></div>
                    <div class="input-box-wrapper">
                        <input type="text" placeholder="Ask something...."></input>
                        <img src={Plane} id="sendIcon"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sample