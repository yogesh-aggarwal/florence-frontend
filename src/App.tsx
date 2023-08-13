import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Signup from "./Routes/Signup";
import Products from "./Routes/Products";
import Cart from "./Routes/Cart";
import Listing from "./Routes/Listing";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<Products />} />

      <Route path="/listing/:category" element={<Listing />} />
      <Route path="/listing" element={<Navigate to="/listing/trending" />} />
    </Routes>
  );
}

export default App;
