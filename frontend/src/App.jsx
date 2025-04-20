// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/Buyer/LandingPage";
import Cart from "./Pages/Buyer/Cart";
import SellerDashboard from "./Pages/Seller/Dashboard";
import AddProduct from "./Pages/Seller/AddProduct";
import ProductStats from "./Pages/Seller/ProductStats";
import AuthPage from "./Pages/AuthPages";
import Profile from "./Pages/Buyer/Profile";
import Orders from "./Pages/Buyer/orders";
import Shopping from "./Pages/Buyer/Shopping";
import ShoppingOpen from "./Pages/Buyer/ShoppingOpen";
import AboutUs from "./Pages/Buyer/AboutUs";
import OrderSuccess from "./Pages/Buyer/order-success";

function App() {
  return (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/seller/stats" element={<ProductStats />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/shopping" element = {<Shopping/>}/>
          <Route path="/shopping/:id" element={<ShoppingOpen />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
  );
}

export default App;
