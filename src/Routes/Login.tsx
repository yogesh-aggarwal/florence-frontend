import "./Login.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../Lib/Constants";

import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { userStore } from "../Lib/State";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [error, setError] = useState<string>("");
  const [backgroundImg, setBackgroundImg] = useState<string>(IMAGES[0]);

  return (
    <div className="LoginComponent">
      <div id="login">
        <div id="header">
          <div id="logo">
            <img src={Logo} alt="this is our logo" />
          </div>
          <div id="name">Florence</div>
        </div>
        <div id="body">
          <div id="upper">
            <div id="welcome">Welcome back,</div>
            <div id="continue">Continue with Google or enter your details.</div>
            <div id="google">
              <div id="googleButton">
                {/* <div id="logogoogle"> */}
                <img src={google} alt="" />
                {/* </div> */}
                <div id="loginWIthGoogle">Log in with Google</div>
              </div>
            </div>
            <div id="or">
              <div className="line"></div>
              <div id="text">or</div>
              <div className="line"></div>
            </div>
          </div>
          <div id="lower">
            <div className="input">
              <input
                type="text"
                value={email}
                placeholder="Email address"
                onChange={(e) => {
                  // e.target = document.getElementById(...)
                  const newEmail = e.target.value;
                  setEmail(newEmail);
                }}
              />
            </div>
            <div className="input">
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  const newPassword = e.target.value;
                  setPassword(newPassword);
                }}
              />
            </div>
            <div id="error">{error}</div>
            <div id="remember">
              <div
                id="rem"
                onClick={() => {
                  setIsChecked(!isChecked);
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                />
                <div id="message">Remember for 30 days</div>
              </div>
              <div id="forgot">Forgot password?</div>
            </div>
            <div
              id="login2"
              onClick={async () => {
                setError("");
                const res = await fetch("http://localhost:4000/login", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    email: email,
                    password: password,
                  }),
                });
                const body = await res.json();
                if (res.status === 200) {
                  localStorage.setItem("token", body["token"]);
                  userStore.set(body["user"]);
                  navigate("/");
                } else {
                  /* Choice 1 */
                  // setError(body["message"]);

                  /* Choice 2 */
                  const errorMsg = body["message"];
                  setError(errorMsg);
                }
              }}
            >
              <div id="loginText">Log in</div>
            </div>
            <div id="noAcc">
              <div id="account">Dont have an account?</div>
              <div
                id="signup"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up for free
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
  );
}
