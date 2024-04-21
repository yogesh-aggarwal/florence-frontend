import "./Products.scss";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { productsStore, useCart, useProducts, useUser } from "../Lib/State";
import {
  ProductDescription_t,
  ProductReview_t,
  Product_t,
} from "../Lib/Types/product";
import { Cart } from "../Lib/cart";
import { useNetworkRequest } from "../Lib/helpers";
import { ReviewCard } from "../Components/ReviewCard";

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
  const product = useProducts().find((product) => product.id === params.id);
  const [url, setUrl] = useState<string | undefined>(product?.images[0]);
  const [productImages, setProductImages] = useState<string[] | undefined>([]);

  const cart = useCart();
  const user = useUser();

  useNetworkRequest(
    "POST",
    "/getProductById",
    { id: params.id, email: user?.email },
    async (res: Response) => {
      const body = await res.json();

      const selectedProduct = body["data"] as Product_t;
      setUrl(selectedProduct.images[0]);

      const products = productsStore.value();
      const doesExist = products.find(
        (product) => product.id === selectedProduct.id
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

  const sortedProductReviews = useMemo(() => {
    if (!product) return;
    if (!product.reviews || product?.reviews.length < 0) return;
    function sortByStars(review1: ProductReview_t, review2: ProductReview_t) {
      return (review2.starsGiven = review1.starsGiven);
    }

    return product.reviews.sort(sortByStars);
  }, [product?.reviews]);

  const imageWindow = useCallback(() => {
    if (!product || !product.images) return;
    if (product.images.length <= 4) return;
    let windowImages = [];
    const window = [];
    const images = product?.images;
    for (let i = 0; i < images?.length; i++) {
      if (window.length <= 4) {
        windowImages.push(images[i]);
      }
      if (window.length === 4) {
        setProductImages(images);
      }

      images.shift();
      images.push(images[i]);
      setProductImages(images);
    }
  }, []);

  if (!product || !url) return <div>Loading</div>;

  return (
    <div id="ProductsComponent">
      <div id="body">
        <div id="left">
          <div id="slider">
            {product.images.length <= 4 ? (
              product.images.map((image) => {
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
              })
            ) : (
              <></>
            )}
            <div className="icons">
              <div
                className={
                  "icon " +
                  (product.images.indexOf(url) === 0 ? "disabled" : "")
                }
                onClick={() => {
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
              {/* <div className="heading">Price</div> */}
              {product.discountInPercent > 0 ? (
                <div className="discount">
                  <div className="actualPrice">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(
                      Math.round(
                        product.price +
                          product.price * (product.discountInPercent / 100)
                      )
                    )}
                  </div>

                  <div className="rate">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(Math.round(product.price))}
                  </div>
                </div>
              ) : (
                <div className="rate">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(Math.round(product.price))}
                </div>
              )}
            </div>
            <div className="cart">
              {!cart[product.id] && (
                <div className="button" onClick={() => Cart.add(product.id)}>
                  <i className="fi fi-sr-shopping-cart"></i>
                  <span>Add to cart</span>
                </div>
              )}
              {cart[product.id] > 0 && (
                <div className="numbers">
                  <div
                    className="action"
                    onClick={() => Cart.deleteProduct(product.id)}
                  >
                    -
                  </div>
                  <div className="number">{cart[product.id]}</div>
                  <div className="action" onClick={() => Cart.add(product.id)}>
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
      <div className="reviews">
        <div className="allReviews">
          {product.reviews.map((review, i) => {
            return <ReviewCard key={i} productReview={review} />;
          })}
        </div>
      </div>
    </div>
  );
}
