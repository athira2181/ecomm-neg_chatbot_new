import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Logout() {
    let navigate = useNavigate();
    
    const logout= ()=>{
        localStorage.removeItem("shop_ID");
        localStorage.removeItem("catg_Id");
        localStorage.removeItem("brand_name");
        localStorage.removeItem("product_Details");
        localStorage.removeItem("user_id");
        localStorage.removeItem("pid")
        localStorage.removeItem("price");
        localStorage.removeItem("qnty");
        localStorage.removeItem("item")
        navigate("/");
    }
  return (
    <div >
      {/* <Button variant="contained" onClick={logout} style={{float:"right",backgroundColor:"brown"}}>LOGOUT</Button> */}
      
    </div>
  )
}

export default Logout
