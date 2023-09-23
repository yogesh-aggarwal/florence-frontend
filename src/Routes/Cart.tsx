import "./Cart.scss";

import Topbar from "../components/Topbar";
import { useCart, useProducts } from "../Lib/State";
import { Cart as CartActions } from "../Lib/cart";
import { useEffect, useState } from "react";

type CartProduct_t = {
  id: string;
  image: string;
  starRatings: number;
  quantity: number;
  price: number;
  title: string;
};

export default function Cart() {
  const cart = useCart();
  const products = useProducts();

  const [cartProducts, setCartProducts] = useState<CartProduct_t[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [delivery, setDelivery] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const taxes = Math.ceil(total * 0.18);
  const finalPrice = total + taxes + delivery - discount;

  useEffect(() => {
    const productIDS = Object.keys(cart);

    const result: CartProduct_t[] = [];
    let sum = 0;
    const coveredProducts = new Set<string>();
    for (const product of products) {
      if (coveredProducts.has(product._id)) continue;
      coveredProducts.add(product._id);

      if (productIDS.includes(product._id)) {
        result.push({
          title: product.title,
          id: product._id,
          image: product.images[0],
          starRatings: product.starRatings,
          price: product.price,
          quantity: cart[product._id],
        });
        sum += product.price * cart[product._id];
      }
    }

    setTotal(sum);
    setDiscount(Math.ceil(sum * 0.05));
    setDelivery(49);

    setCartProducts(result);
  }, [cart, products]);

  return (
    <div className="CartComponent">
      <Topbar></Topbar>
      <div className="body">
        <div className="left">
          <div className="heading">Cart</div>
          <div className="cards">
            {cartProducts.map((currentProduct, i) => {
              return (
                <div key={i} className="card">
                  <img src={currentProduct.image} alt="" />
                  <div className="info">
                    <div className="basic">
                      <div className="title">{currentProduct.title}</div>
                      <div className="stars">
                        <i className="fi fi-sr-star"></i>
                        <span>{currentProduct.starRatings} stars</span>
                      </div>
                    </div>
                    <div className="price">
                      <div className="count">
                        <div
                          className="button"
                          onClick={() => {
                            CartActions.add(currentProduct!.id);
                          }}
                        >
                          +
                        </div>
                        <span>{cart[currentProduct.id]}</span>
                        <div
                          className="button"
                          onClick={() => {
                            CartActions.deleteProduct(currentProduct!.id);
                          }}
                        >
                          -
                        </div>
                      </div>
                      <div className="total">
                        <span>₹</span>
                        <span>
                          {+currentProduct.price * cart[currentProduct.id]}
                        </span>
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
                <div className="item head">
                  <span>Product name</span>
                  <span>Q</span>
                  <span>Price</span>
                </div>
                {cartProducts.map((product) => {
                  return (
                    <div className="item">
                      <span>{product.title}</span>
                      <span>{product.quantity}</span>
                      <span>₹{product.price}</span>
                    </div>
                  );
                })}
              </div>
              <div className="bottom">
                <div className="item">
                  <span>Taxes</span>
                  <span></span>
                  <span>₹{taxes}</span>
                </div>
                <div className="item">
                  <span>Delivery charges</span>
                  <span></span>
                  <span>₹{delivery}</span>
                </div>
                <div className="item discount">
                  <span>Discount</span>
                  <span></span>
                  <span>-₹{discount}</span>
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
                <span>{finalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
