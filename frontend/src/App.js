import React from 'react'
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart2 from './components/Cart2';
import Regisshop from "./components/Regisshop";
import Logshop from "./components/Logshop";
import Loguser from "./components/Loguser";
import Regisuser from "./components/Regisuser";
import Products from "./components/DisplayProduct";
import BuyNow from "./components/BuyNow";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import Single_Shop_Prods from './components/Single_Shop_Prods'
import AddProduct from './components/AddProduct';
import Logout from './components/Logout';
import EditProduct from './components/EditProduct';
import ProductDetail from './components/ProductDetail';
import Prod_By_Catg from './components/Prod_By_Catg';
import Prod_By_Brand from './components/Prod_By_Brand';
import UserProfile from './components/UserProfile'
import ShopProfile from './components/ShopProfile'
import NetBanking from './components/NetBanking'
import Bill from './components/Bill'
import shopMap from './components/shopMap';
import { useNavigate} from 'react-router'

function App() {

  // const refresh =()=>{
  //   {setTimeout(function() {
  //     // window.location.reload();
  //     Navbar.cart_count();
  //   }, 1000)
  //   }
  // }
  return (
    <div>
      <Router>
        <Navbar />
        {/* <Logout /> */}
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/signup" element={<Regisshop />} />
        <Route exact path="/logshop" element={<Logshop />} />
        <Route exact path="/loguser" element={<Loguser />} />
        <Route exact path="/Regisuser" element={<Regisuser />} />
        <Route exact path="/cart2" element={<Cart2 />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/buy" element={<BuyNow />} />
          <Route exact path="/single_shop_prods" element={<Single_Shop_Prods />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/editproduct" element={<EditProduct />} />
          <Route exact path="/productdetail" element={<ProductDetail />} />
          <Route exact path="/prodbycatg" element={<Prod_By_Catg />} />
          <Route exact path="/prodbybrand" element={<Prod_By_Brand />} />
          <Route exact path="/userprofile" element={<UserProfile />} />
          <Route exact path="/shopprofile" element={<ShopProfile />} />
          <Route exact path="/netbanking" element={<NetBanking />} />
          <Route exact path="/bill" element={<Bill />} />
          <Route exact path="/shopMap" element={<shopMap />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
        <Chatbot />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
