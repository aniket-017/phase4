import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Layouts/Header/Header";
import LoginSignUp from "./Components/LoginSignUp.js";
import Page1 from "./Components/Page1.js";
import ProductDetails from "./Components/ProductDetails";
import Profile from "./Components/Profile.js"
import Cart from "./Components/Cart.js"
function App() {

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
// console.log(isAuthenticated);

  return (
    <div>
      <Router>
      {isAuthenticated && <Header />}
        <Routes>
       
        <Route path="/products" element={<Page1 />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:keyword" element={<Page1 />} />
        {/* <Route path="/login" element={<Page1 />} /> */}
    
        <Route path="/:id" element={<ProductDetails />} />
        <Route path="/main" element={<Page1 />} />
        {/* <Route path="/" element={<Page1 />} /> */}
        
        <Route path="/" element={isAuthenticated ? <Page1/>: <LoginSignUp />}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
