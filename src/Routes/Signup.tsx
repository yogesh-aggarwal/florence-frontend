import "./Signup.scss"

// Importing the image
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userStore } from "../Lib/State"
// const { useEffect, useState } = require("react");

const IMAGES = [
   "https://e0.pxfuel.com/wallpapers/238/812/desktop-wallpaper-white-lilies-and-background-stargazer-lily.jpg",
   "https://e0.pxfuel.com/wallpapers/383/835/desktop-wallpaper-white-easter-lilies-widescreen-flowers-in-2019-lily-stargazer-lily-thumbnail.jpg",
   "https://cdn.shopify.com/s/files/1/2690/0106/products/DSC03418_1b5b6685-17f8-476c-a3fd-a197728d6859_600x.jpg?v=1638614981",
   "https://wallpaperboat.com/wp-content/uploads/2020/04/aesthetic-rose-wallpaper-1920x1080-1.jpg",
   "https://wallpaperset.com/w/full/0/3/a/479893.jpg",
   "https://getwallpapers.com/wallpaper/full/e/3/6/1413450-cherry-blossom-desktop-background-1920x1080-meizu.jpg",
]

export default function Signup() {
   {
      const [email, setEmail] = useState<string>("")
      const [password, setPassword] = useState<string>("")
      const [name, setName] = useState<string>("")
      const [error, setError] = useState<string>("")
      const [backgroundImg, setBackgroundImg] = useState<string>(IMAGES[0])
      const navigate = useNavigate()
      useEffect(() => {
         const id = setInterval(() => {
            const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)]
            setBackgroundImg(randomImage)
         }, 4000)
         return () => {
            clearInterval(id)
         }
      }, [])
      return (
         <div id="signup-component">
            <div id="login">
               <div id="header">
                  <div id="logo">
                     <img src="/logo.png" alt="this is our logo" />
                  </div>
                  <div id="name">Florence</div>
               </div>
               <div id="body">
                  <div id="upper">
                     <div id="welcome">Welcome to, Florence</div>
                     <div id="continue">For happy shopping please signup.</div>
                     <div id="or">
                        <div className="line"></div>
                     </div>
                  </div>
                  <div id="lower">
                     <div className="input">
                        <input
                           type="text"
                           value={name}
                           placeholder="name"
                           onChange={(e) => {
                              const newName = e.target.value
                              setName(newName)
                           }}
                        />
                     </div>
                     <div className="input">
                        <input
                           type="email"
                           value={email}
                           placeholder="email"
                           onChange={(e) => {
                              const newemail = e.target.value
                              setEmail(newemail)
                           }}
                        />
                     </div>
                     <div className="input">
                        <input
                           type="password"
                           value={password}
                           placeholder="password"
                           onChange={(e) => {
                              const newPassword = e.target.value
                              setPassword(newPassword)
                           }}
                        />
                     </div>
                     <div id="error">{error}</div>
                     <div id="remember">
                        <div id="rem">
                           <div
                              id="login2"
                              onClick={async () => {
                                 const res = await fetch("http://localhost:4000/signup", {
                                    method: "POST",
                                    headers: { "content-type": "application/json" },
                                    body: JSON.stringify({
                                       email: email,
                                       password: password,
                                       name: name,
                                    }),
                                 })
                                 const body = await res.json()
                                 if (res.status === 200) {
                                    localStorage.setItem("token", body["token"])
                                    navigate("/listing")
                                    userStore.set(body["user"])
                                 } else {
                                    setError(body["message"])
                                 }
                              }}
                           >
                              <div id="loginText">Signup</div>
                           </div>
                        </div>
                     </div>

                     <div id="noAcc">
                        <div id="account">Already have an account?</div>
                        <div
                           id="signup"
                           onClick={() => {
                              navigate("/login")
                           }}
                        >
                           Login
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div id="img">
               {/* Instead of writing: <img src="background.jpg" /> cz react don't know about its location in our project */}
               <img src={backgroundImg} />
            </div>
         </div>
      )
   }
}
