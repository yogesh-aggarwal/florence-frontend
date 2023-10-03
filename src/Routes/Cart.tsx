import "./Cart.scss";

import { useEffect, useState } from "react";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { useCart, useProducts, useUser, cartStore } from "../Lib/State";
import { Cart as CartActions } from "../Lib/cart";
import { networkRequest } from "../Lib/helpers";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

type CartProduct_t = {
  id: string;
  image: string;
  starRatings: number;
  quantity: number;
  price: number;
  title: string;
};

function CheckoutButton(props: { finalPrice: number }) {
  const [Razorpay] = useRazorpay();
  const user = useUser();
  const cart = useCart();
  const navigate = useNavigate();

  const handlePayment = async () => {
    const order = await networkRequest("POST", "/order", {
      amount: props.finalPrice * 100,
    });
    // const order = await createOrder(); //  Create order on your backend
    if (!user) return;

    if (order.status !== 200) return;

    const orderMeta = await order.json();
    console.log(orderMeta);

    const options: RazorpayOptions = {
      key: "rzp_test_rMU9G0FV33EqNz", // Enter the Key ID generated from the Dashboard
      amount: orderMeta["order"]["amount"].toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Florence",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderMeta["order"]["id"], //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: async function (response) {
        const orderInfo = response;
        const orderPlaced = await networkRequest("POST", "/orderPlaced", {
          ...orderInfo,
          cart: cart,
          userId: user._id,
        });
        if (orderPlaced.status === 200) {
          console.log(300);
          const order = await orderPlaced.json();
          cartStore.reset();
          navigate(`/order/${order["orderId"]}`);
        } else {
          console.log("failed");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobileNumbers[0] ?? "",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response: any) {});

    rzp1.open();
  };

  return (
    <div
      className="button"
      onClick={() => {
        handlePayment();
      }}
    >
      <span>Checkout</span>
      <i className="fi fi-sr-arrow-right"></i>
    </div>
  );
}

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
              <CheckoutButton finalPrice={finalPrice} />
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
