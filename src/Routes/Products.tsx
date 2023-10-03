import "./Products.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productsStore, useCart, useProducts } from "../Lib/State";
import { ProductDescription_t, Product_t } from "../Lib/Types/product";
import { useNetworkRequest } from "../Lib/helpers";
import Topbar from "../components/Topbar";
import { Cart } from "../Lib/cart";

function ProductInfo(props: {
  heading: string;
  content: ProductDescription_t[];
}) {
  return (
    <div className="section">
      {props.heading && <div className="heading">{props.heading}</div>}
      {props.content.map((section) => {
        if (section.type === "para") {
          return <p>{section.content}</p>;
        }
        return (
          <ul>
            {(section.content as string[]).map((s) => {
              return <li>{s}</li>;
            })}
          </ul>
        );
      })}
    </div>
  );
}

export default function Product() {
  const params = useParams();
  const product = useProducts().find((product) => product._id === params.id);
  const [url, setUrl] = useState<string | undefined>(product?.images[0]);

  const cart = useCart();

  useNetworkRequest(
    "POST",
    "/getProductById",
    { id: params.id },
    async (res: Response) => {
      const body = await res.json();

      const selectedProduct = body["data"] as Product_t;
      setUrl(selectedProduct.images[0]);

      const products = productsStore.value();
      const doesExist = products.find(
        (product) => product._id === selectedProduct._id
      );
      if (doesExist) return;

      productsStore.set([...products, selectedProduct]);
    },
    []
  );

  useEffect(() => {
    function worker(e: KeyboardEvent) {
      if (!product || !url) return;

      if (e.key === "ArrowUp") {
        const imagePos = product.images.indexOf(url);
        if (imagePos === 0) return;
        e.preventDefault();
        const nxtImg = product.images[imagePos - 1];
        setUrl(nxtImg);
      }
      if (e.key === "ArrowDown") {
        const imagePos = product.images.indexOf(url);
        if (imagePos === product.images.length - 1) return;
        e.preventDefault();
        const nxtImg = product.images[imagePos + 1];
        setUrl(nxtImg);
      }
    }

    document.addEventListener("keydown", worker);
    return () => {
      document.removeEventListener("keydown", worker);
    };
  }, [product, url]);

  useEffect(() => {
    const id = setInterval(() => {
      // document.dispatchEvent(new Event("keydown", { key: "ArrowDown" } as any));
      if (!product || !url) return;
      const productImages = product.images;
      let constPost = product.images.indexOf(url);
      if (constPost === productImages.length - 1) {
        constPost = -1;
      }
      setUrl(product.images[constPost + 1]);
    }, 3000);
    return () => {
      clearInterval(id);
    };
  }, [product, url]);

  if (!product || !url) return <div>Loading</div>;

  return (
    <div id="ProductsComponent">
      <div id="body">
        <div id="left">
          <div id="slider">
            {product.images.map((image) => {
              return (
                <img
                  src={image}
                  // style={{
                  //   border: image === url ? "2px solid transparent" : "none",
                  //   outline: image === url ? "1px solid #000" : "none",
                  // }}
                  className={image === url ? "active" : ""}
                  onClick={() => {
                    setUrl(image);
                  }}
                />
              );
            })}
            <div className="icons">
              <div
                className={
                  "icon " +
                  (product.images.indexOf(url) === 0 ? "disabled" : "")
                }
                onClick={() => {
                  // console.log(product.images);
                  const imagePos = product.images.indexOf(url);
                  if (imagePos === 0) return;
                  const prevImage = product.images[imagePos - 1];
                  setUrl(prevImage);
                }}
              >
                <i className="fi fi-rr-angle-up"></i>
              </div>
              <div
                className={
                  "icon " +
                  (product.images.indexOf(url) === product.images.length - 1
                    ? "disabled"
                    : "")
                }
                onClick={() => {
                  const imagePos = product.images.indexOf(url);
                  if (imagePos === product.images.length - 1) return;
                  const nxtImg = product.images[imagePos + 1];
                  setUrl(nxtImg);
                }}
              >
                <i className="fi fi-rr-angle-down"></i>
              </div>
            </div>
          </div>
          <div id="image">
            <img src={url} />
          </div>
        </div>
        <div className="right">
          <div className="title">{product.title}</div>
          <div className="info">
            <div className="pill category">
              <i className="fi fi-sr-star"></i>
              <span>Celebration</span>
            </div>
            <div className="pill discount">
              <i className="fi fi-sr-bookmark"></i>
              <span>{product.discountInPercent}% discount</span>
            </div>
            <div className="pill reviews">
              <i className="fi fi-sr-messages"></i>
              <span>{product.reviews.length} Reviews</span>
            </div>
            <div className="pill">
              <i className="fi fi-sr-truck-side"></i>
              <span>{product.stock} in stock</span>
            </div>
          </div>
          <div className="actions">
            <div className="price">
              <div className="heading">Price</div>
              <div className="rate">INR {product.price}</div>
            </div>
            <div className="cart">
              {!cart[product._id] && (
                <div className="button" onClick={() => Cart.add(product._id)}>
                  <i className="fi fi-sr-shopping-cart"></i>
                  <span>Add to cart</span>
                </div>
              )}
              {cart[product._id] > 0 && (
                <div className="numbers">
                  <div
                    className="action"
                    onClick={() => Cart.deleteProduct(product._id)}
                  >
                    -
                  </div>
                  <div className="number">{cart[product._id]}</div>
                  <div className="action" onClick={() => Cart.add(product._id)}>
                    +
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="details">
            <ProductInfo heading="" content={product.description} />
            <ProductInfo
              heading="Care instructions"
              content={product.careInstructions}
            />
            <ProductInfo
              heading="Delivery information"
              content={product.deliveryInfo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
