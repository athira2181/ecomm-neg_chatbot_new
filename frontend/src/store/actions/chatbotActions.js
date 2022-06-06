import Axios from "axios";

export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const UPDATE_USER_MESSAGE = "UPDATE_USER_MESSAGE";
export const NEGOTIATE = "NEGOTIATE";

export const textQueryAction = (data) =>{
    return async dispatch => {
            dispatch({ type: UPDATE_USER_MESSAGE, data: data })
            if(data.command!=="###nego"){
            const responses = await Axios.post("http://localhost:3002/chat_in",{
                            command: data.command,
                            text:data.text,
                            userName: "athu123",
                            })
                            return dispatch({ type: UPDATE_MESSAGE, data: responses.data })
            }
            else{
                const responses = await Axios.post("http://localhost:3002/chat_in",{
                    command: data.command,
                    pid: data.pid
                    })
                    console.log(responses.data)
                    return dispatch({ type: NEGOTIATE, data: responses.data[0] }) 
            }
            // console.log("response",responses.data)
            
        
        
    }
}