import "./Profile.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, userStore } from "../Lib/State";
import { Order_t } from "../Lib/Types/order";
import { useNetworkRequest } from "../Lib/helpers";
import img from "../Assets/404img.svg";

export default function Profile() {
  const user = useUser();
  const [orders, setOrders] = useState<Order_t[] | null>(null);
  useNetworkRequest("POST", "/getOrderByUserId", {}, async (res) => {
    const order = (await res.json()).orders;
    setOrders(order);
  });
  // ;
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
    return null;
  }

  const primaryAddress = user.deliveryAddresses[0];

  return (
    <div className="ProfileComponent">
      <div className="body">
        <div className="left">
          <div className="image">
            <img src={user.dp} alt="" />
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
          {user ? (
            <div
              className="field"
              onClick={() => {
                navigate("/wishlist");
              }}
            >
              <i className="fi fi-sr-heart"></i>
              <span>{"Wishlist"}</span>
            </div>
          ) : (
            <></>
          )}

          <div
            className="field"
            onClick={() => {
              localStorage.clear();
              userStore.reset();
            }}
          >
            <i className="fi fi-sr-exit"></i>
            <span>Logout</span>
          </div>
        </div>
        {/* <div className="line"></div> */}
        {!orders?.length ? (
          <div className="right">
            <div className="noOrders">
              <div className="mgs">No orders found</div>
              <img src={img} alt="" />
            </div>
          </div>
        ) : (
          <div className="right">
            <div className="heading">Orders</div>
            <div className="orders">
              {orders.map((order, i) => {
                return (
                  <div
                    key={i}
                    className="order"
                    onClick={() => {
                      navigate(`/order/${order.id}`);
                    }}
                  >
                    <div className="id">#{order.id.slice(6)}</div>
                    <div className="orderStatus">
                      Order Status: {order.currentStatus}
                    </div>
                    <div className="info">
                      <div className="date">
                        {new Date(
                          order.timestamps[order.currentStatus]
                        ).toLocaleString()}
                      </div>
                      <div className="items">
                        {Object.keys(order.orderItems).length} items
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
