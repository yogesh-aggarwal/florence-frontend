import "./Order.scss";

import Topbar from "../components/Topbar";
import { SAMPLE_PRODUCT } from "../Lib/misc";

export default function Order() {
  const arr = [1, 2, 3, 4];
  
  return (
    <div className="OrderComponent">
      <Topbar />
      <div className="body">
        <div className="left">
          <div className="heading">Orders</div>
          <div className="cards">
            {arr.map((ele, i) => {
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
                    <div className="price"></div>
                    <div className="total">
                      <span>₹</span>
                      <span>{SAMPLE_PRODUCT.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
