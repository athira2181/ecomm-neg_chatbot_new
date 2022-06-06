import { UPDATE_MESSAGE, UPDATE_USER_MESSAGE, NEGOTIATE } from "../actions/chatbotActions";

const initialState ={
     messages : []
}

const chatbotReducer = (state = initialState, action) =>{
    switch (action.type) {
        case UPDATE_MESSAGE:
            // console.log("reply",action.data[0].p_name)
            
            let message = {
                speak: "bot",
                text: action.data.response,
                intent: action.data.intent_name,
                item: action.data.parameter,
                
            }
            return {
                ...state, messages : [...state.messages, message]
            };
        case UPDATE_USER_MESSAGE:
            // console.log("inreducer",action.data)
            let messageUser = {
                speak: "user",
                text: action.data.text
            }
            return {
                ...state, messages : [...state.messages, messageUser]
            };

            case NEGOTIATE:
                // console.log("inreducer",action.data)
                let messageNego = {
                    speak: "nego",
                    p_name: action.data.p_name,
                    pid: action.data.pid,
                    img: action.data.img,
                    price: action.data.price,
                    brand: action.data.brand,
                    shop_name: action.data.shop_name
                }
                return {
                    ...state, messages : [...state.messages, messageNego]
                };    
        default:
            return state;
    }
}

export default chatbotReducer