import "./Topbar.scss";

import Logo from "../assets/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../Lib/State";

export default function Topbar() {
  const navigate = useNavigate();
  const params = useParams();
  const user = useUser();

  return (
    <>
      <div id="title">
        <div className="leftTitle">
          <div id="app">
            <div id="logo">
              <img src={Logo} alt="" />
            </div>
            {/* <div id="florence">Florence</div> */}
            <div id="florence">Florence</div>
          </div>
          <div id="catagory">
            <div
              className={
                "category " + (params.category === "birthday" ? "active" : "")
              }
              onClick={() => {
                navigate("/listing/birthday");
              }}
            >
              Birthday
            </div>
            <div
              className={
                "category " + (params.category === "romance" ? "active" : "")
              }
              onClick={() => {
                navigate("/listing/romance");
              }}
            >
              Love & Romance
            </div>
            <div
              className={
                "category " +
                (params.category === "anniversary" ? "active" : "")
              }
              onClick={() => {
                navigate("/listing/anniversary");
              }}
            >
              Anniversary
            </div>
            <div
              className={
                "category " +
                (params.category === "celebration" ? "active" : "")
              }
              onClick={() => {
                navigate("/listing/celebration");
              }}
            >
              Celebration
            </div>
            <div
              className={
                "category " + (params.category === "sympathy" ? "active" : "")
              }
              onClick={() => {
                navigate("/listing/sympathy");
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
              navigate("/cart");
            }}
          >
            <i className="fi fi-sr-shopping-cart"></i>
          </div>
          <div
            className="profile"
            onClick={() => {
              navigate("/Profile");
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
      <div id="divider"></div>
    </>
  );
}
