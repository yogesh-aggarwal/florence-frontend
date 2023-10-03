import "./Order.scss";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Order_t, OrderedProducts_t } from "../Lib/Types/order";
import { networkRequest, useNetworkRequest } from "../Lib/helpers";
import Topbar from "../components/Topbar";
import { orderstore } from "../Lib/State";

export default function Order() {
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order_t | null>(null);
  const [orderedProducts, setOrderedProducts] = useState<
    OrderedProducts_t[] | null
  >(null);
  const params = useParams();
  const orderId = params.id;

  useNetworkRequest("POST", "/getOrderById", { id: orderId }, async (res) => {
    const order = (await res.json()).order;
    orderstore.set(order);
    setOrder(order);
    if (!order) {
      return;
    }
    const orderProductIds = Object.keys(order!.orderItems);
    if (!orderProductIds) return;
    const body = await networkRequest("POST", "/getProductByIds", {
      ids: orderProductIds,
    });

    const ordereProducts = (await body.json()).data;
    setOrderedProducts(ordereProducts);
  });

  if (!order || !orderedProducts) return;

  return (
    <div className="OrderComponent">
      <Topbar />
      <div className="orders">
        <div className="body">
          <div className="ori">
            <div className="left">
              <div className="heading">Order ID: #{order.id.slice(6)}</div>
              <div className="cards">
                {orderedProducts.map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="card"
                      onClick={() => {
                        navigate(`/product/${ele.id}`);
                      }}
                    >
                      <img src={ele.image} alt="" />
                      <div className="info">
                        <div className="title">{ele.title}</div>
                        <div className="other">
                          <div className="basic">
                            <div className="quant">
                              <span>{order.orderItems[ele.id]} items</span>
                            </div>
                            <div className="price">
                              <span> ₹{order.priceItems[ele.id]} </span>
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
                <div className="items">{orderedProducts.length} items</div>
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
