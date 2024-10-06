import "./App.css"

import { GoogleOAuthProvider } from "@react-oauth/google"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import img from "./Assets/404img.svg"
import Topbar from "./Components/Topbar"
import Cart from "./routes/Cart"
import Home from "./routes/Home"
import Listing from "./routes/Listing"
import Login from "./routes/Login"
import Order from "./routes/Order"
import Products from "./routes/Products"
import Profile from "./routes/Profile"
import Signup from "./routes/Signup"
import Wishlist from "./routes/Wishlist"

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
