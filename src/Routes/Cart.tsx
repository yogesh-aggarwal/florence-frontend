import "./Cart.scss";

import Topbar from "../components/Topbar";
import { SAMPLE_PRODUCT } from "../Lib/misc";

export default function Cart() {
  return (
    <div className="CartComponent">
      <Topbar></Topbar>
      <div className="body">
        <div className="left">
          <div className="heading">Cart</div>
          <div className="cards">
            {[...Array(8)].map((_, i) => {
              return (
                <div key={i} className="card">
                  <img src={SAMPLE_PRODUCT.images[0]} alt="" />
                  <div className="info">
                    <div className="basic">
                      <div className="title">{SAMPLE_PRODUCT.title}</div>
                      <div className="stars">
                        <i className="fi fi-sr-star"></i>
                        <span>{SAMPLE_PRODUCT.starRatings} stars</span>
                      </div>
                    </div>
                    <div className="price">
                      <div className="count">
                        <div className="button">+</div>
                        <span>3</span>
                        <div className="button">-</div>
                      </div>
                      <div className="total">
                        <span>₹</span>
                        <span>999</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="right">
          <div className="heading">Reciept</div>
          <div className="content">
            <div className="list">
              <div className="top">
                <div className="item">
                  <span>Name</span>
                  <span>₹999</span>
                </div>
              </div>
              <div className="bottom">
                <div className="item">
                  <span>Taxes</span>
                  <span>₹118</span>
                </div>
                <div className="item">
                  <span>Delivery charges</span>
                  <span>₹49</span>
                </div>
                <div className="item discount">
                  <span>Discount</span>
                  <span>-₹118</span>
                </div>
              </div>
            </div>
            <div className="cta">
              <div className="button">
                <span>Checkout</span>
                <i className="fi fi-sr-arrow-right"></i>
              </div>
              <div className="total">
                <span>₹</span>
                <span>999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
