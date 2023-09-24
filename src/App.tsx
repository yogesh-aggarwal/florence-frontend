import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Products from "./Routes/Products";
import Cart from "./Routes/Cart";
import Listing from "./Routes/Listing";
import Profile from "./Routes/Profile";
import Order from "./Routes/Order";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/not-found" element={<div>Not found 404</div>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order" element={<Order />} />

        <Route path="/listing/:category" element={<Listing />} />
        <Route path="/listing" element={<Navigate to="/listing/trending" />} />

        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
