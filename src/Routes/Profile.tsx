import "./Profile.scss";

import Topbar from "../components/Topbar";
import { useUser } from "../Lib/State";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = useUser();
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
    return null;
  }

  const primaryAddress = user.deliveryAddresses[0];

  return (
    <div className="ProfileComponent">
      <Topbar />
      <div className="body">
        <div className="left">
          <div className="image">
            <img
              src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              alt=""
            />
          </div>
          <div className="name">
            <span>{user.name}</span>
          </div>
          <div className="field">
            <i className="fi fi-sr-smartphone"></i>
            <span>{user.mobileNumbers[0] ?? "Add Phone number"}</span>
          </div>
          {primaryAddress && (
            <>
              <div className="field">
                <i className="fi fi-sr-marker"></i>
                <span>
                  {primaryAddress.address},{primaryAddress.city}
                </span>
              </div>
              <div className="field">
                <i className="fi fi-sr-marker"></i>
                <span>{primaryAddress.pincode}</span>
              </div>
            </>
          )}
          {!primaryAddress && (
            <div className="field" onClick={() => {}}>
              <i className="fi fi-sr-marker"></i>
              <span>Add address</span>
            </div>
          )}
        </div>
        <div className="right">
          <div className="heading">Orders</div>
          <div className="orders">
            <div className="order">
              <div className="id">#ASER123</div>
              <div className="orderStatus">Order Status: Pending</div>
              <div className="info">
                <div className="date">8 Sept, 2023</div>
                <div className="items">3 items</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
