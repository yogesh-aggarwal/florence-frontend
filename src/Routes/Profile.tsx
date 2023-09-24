import "./Profile.scss";

import Topbar from "../components/Topbar";

export default function Profile() {
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
            <span>Bird Gupta</span>
          </div>
          <div className="field">
            <i className="fi fi-sr-smartphone"></i>
            <span>9718343430</span>
          </div>
          <div className="field">
            <i className="fi fi-sr-marker"></i>
            <span>3 floor vivekanand puri</span>
          </div>
          <div className="field">
            <i className="fi fi-sr-marker"></i>
            <span>110085</span>
          </div>
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
