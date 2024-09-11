import "./App.css"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./Routes/Home"
import Login from "./Routes/Login"
import Signup from "./Routes/Signup"
import Products from "./Routes/Products"
import Cart from "./Routes/Cart"
import Listing from "./Routes/Listing"
import Profile from "./Routes/Profile"
import Order from "./Routes/Order"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Topbar from "./Components/Topbar"
import Wishlist from "./Routes/Wishlist"
import img from "./Assets/404img.svg"

function App() {
   return (
      <GoogleOAuthProvider clientId="609441188878-gj7sj9mht2a7f0h2qg266f3dn1739mfs.apps.googleusercontent.com">
         <BrowserRouter>
            <Topbar />

            <Routes>
               <Route
                  path="/not-found"
                  element={
                     <div className="img">
                        <img src={img} alt="" />
                     </div>
                  }
               />

               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />

               <Route path="/" element={<Home />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/product/:id" element={<Products />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/order/:id" element={<Order />} />
               <Route path="/wishlist" element={<Wishlist />} />
               <Route path="/listing/:category" element={<Listing />} />
               <Route path="/listing" element={<Navigate to="/listing/trending" />} />

               <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
         </BrowserRouter>
      </GoogleOAuthProvider>
   )
}

export default App
