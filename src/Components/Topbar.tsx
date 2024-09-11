import "./Topbar.scss"

import Logo from "../Assets/logo.png"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { cartStore, useCart, useUser } from "../Lib/State"
import { useEffect, useState } from "react"

export default function Topbar() {
   const navigate = useNavigate()
   const params = useParams()
   const user = useUser()
   const location = useLocation()
   const page = location.pathname.slice(1)
   const cart = useCart()

   const [cartValue, setCartValue] = useState<number>(0)

   useEffect(() => {
      let num = { ...cartStore.value() }
      let arr = Object.keys(num)
      setCartValue(arr.length)
   }, [cart])

   return (
      <div id="topbar" className={page === "login" || page === "signup" ? "active" : ""}>
         <div className="leftTitle">
            <div
               id="app"
               onClick={() => {
                  navigate("/")
               }}
            >
               <div id="logo">
                  <img src={Logo} alt="" />
               </div>
               {/* <div id="florence">Florence</div> */}
               <div id="florence">Florence</div>
            </div>
            <div id="catagory">
               <div
                  className={"category " + (params.category === "birthday" ? "active" : "")}
                  onClick={() => {
                     navigate("/listing/birthday")
                  }}
               >
                  Birthday
               </div>
               <div
                  className={"category " + (params.category === "romance" ? "active" : "")}
                  onClick={() => {
                     navigate("/listing/romance")
                  }}
               >
                  Love & Romance
               </div>
               <div
                  className={"category " + (params.category === "anniversary" ? "active" : "")}
                  onClick={() => {
                     navigate("/listing/anniversary")
                  }}
               >
                  Anniversary
               </div>
               <div
                  className={"category " + (params.category === "celebration" ? "active" : "")}
                  onClick={() => {
                     navigate("/listing/celebration")
                  }}
               >
                  Celebration
               </div>
               <div
                  className={"category " + (params.category === "sympathy" ? "active" : "")}
                  onClick={() => {
                     navigate("/listing/sympathy")
                  }}
               >
                  Sympathy & Funeral
               </div>
            </div>
         </div>
         <div className="rightTitle">
            <div
               className="cart"
               onClick={() => {
                  navigate("/cart")
               }}
            >
               <i className="fi fi-sr-shopping-cart"></i>
               {!cartValue ? <></> : <div className="cartValue">{cartValue}</div>}
            </div>
            <div
               className="profile"
               onClick={() => {
                  navigate("/profile")
               }}
            >
               {!user ? (
                  <div className="profile">
                     <i className="fi fi-sr-users"></i>
                  </div>
               ) : (
                  <div className="dp">
                     <img src={user.dp} alt="" />
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}
