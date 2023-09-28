import "./Order.scss";

import Topbar from "../components/Topbar";
import { SAMPLE_PRODUCT } from "../Lib/misc";

export default function Order() {
  const arr = [1, 2, 3, 4];

  return (
    <div className="OrderComponent">
      <Topbar />
      <div className="orders">
        <div className="body">
          <div className="ori">
            <div className="left">
              <div className="heading">Order: #TYU45674</div>
              <div className="cards">
                {arr.map((ele, i) => {
                  return (
                    <div key={i} className="card">
                      <img src={SAMPLE_PRODUCT.images[0]} alt="" />
                      <div className="info">
                        <div className="title">{SAMPLE_PRODUCT.title}</div>
                        <div className="other">
                          <div className="date">Ordered on Fri,3 june</div>
                          <div className="status">Status Deliverd</div>

                          <div className="basic">
                            <div className="quant">
                              <span>Qty: 1</span>
                            </div>
                            <div className="price"></div>
                            <div className="total">
                              <span>₹</span>
                              <span>{SAMPLE_PRODUCT.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="right">
              <div className="del">
                <div className="ship">shipment 1 of 1</div>
                <div className="items">3 items delivered</div>
                <div className="package">package delivered on </div>
                <div className="delDate">Sun, 7june</div>
              </div>
              <div className="sections">
                <div className="section">
                  <div className="box">
                    <i className="fi fi-sr-check"></i>
                    <div className="title">Order Confirm</div>
                  </div>
                  <div className="date">Fri, 5june</div>
                </div>
                <div className="section">
                  <div className="box">
                    <i className="fi fi-rr-check"></i>
                    <div className="title">Order Shipped</div>
                  </div>
                  <div className="date">Sat, 6june</div>
                </div>
                <div className="section">
                  <div className="box">
                    <i className="fi fi-rr-check"></i>
                    <div className="title">Delivered</div>
                  </div>
                  <div className="date">Sun, 7june</div>
                </div>
              </div>
              <div className="rate">
                <div className="rateOrder">Rate your Order</div>
                <div className="ratings">
                  <div className="rating">
                    <div className="title">Product</div>
                    <div className="stars">
                      <i className="fi fi-rr-star"></i>
                      <i className="fi fi-rr-star"></i>
                      <i className="fi fi-rr-star"></i>
                      <i className="fi fi-rr-star"></i>
                      <i className="fi fi-rr-star"></i>
                    </div>
                  </div>
                  <div className="rating">
                    <div className="title">Delivery</div>
                    <div className="stars">
                      <i className="fi fi-rr-star"></i>
                      <i className="fi fi-rr-star"></i>
                      <i className="fi fi-rr-star"></i>
                      <i className="fi fi-rr-star"></i>
                      <i className="fi fi-rr-star"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
