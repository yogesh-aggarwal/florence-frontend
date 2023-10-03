import "./Listing.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toTitleCase, useNetworkRequest } from "../Lib/helpers";
import Topbar from "../components/Topbar";
import { Product_t } from "../Lib/Types/product";
import { productsStore, useProducts } from "../Lib/State";

function ProductCard(props: { product: Product_t }) {
  const navigate = useNavigate();
  return (
    <div
      className="product"
      onClick={() => {
        // navigate("/product/" + props.product._id);
        navigate(`/product/${props.product._id}`);
      }}
    >
      <div className="like">
        <i className="fi fi-rr-heart"></i>
      </div>
      <div className="image">
        <img src={props.product.images[0]} />
      </div>
      <div className="prodInfo">
        <div className="podTitle">
          {props.product.title.slice(0, 45).trim()}
          {props.product.title.length > 45 ? "..." : ""}
        </div>
        <div className="price">₹ {props.product.price}</div>
      </div>
    </div>
  );
}

export default function Listing() {
  const params = useParams() as { category: string };
  const products = useProducts();

  const [activeSort, setActiveSort] = useState("");
  const isTrendingSection = params.category.toLowerCase() === "trending";
  const [sortedProducts, setSortedProducts] = useState<Product_t[]>([]);

  const [filter, setFilter] = useState({
    price: 0,
    delivery: 0,
    discount: 0,
  });
  const [maxFilter, setMaxFilter] = useState({
    price: 0,
    delivery: 0,
    discount: 0,
  });

  useNetworkRequest(
    isTrendingSection ? "GET" : "POST",
    isTrendingSection ? "/getTrendingProducts" : "/getProductsByCategory",
    isTrendingSection ? undefined : { category: params.category.toLowerCase() },
    async (res) => {
      const body = await res.json();
      const allProducts = body["data"] as Product_t[];
      productsStore.set(allProducts);
    },

    [params.category]
  );

  useEffect(() => {
    const result = [...products].sort((a, b) => {
      /// -ve, 0, +ve
      switch (activeSort) {
        case "stars":
          return b.starRatings - a.starRatings;
        case "price":
          return b.price - a.price;
        case "delivery":
          return b.deliveryCharges - a.deliveryCharges;
        case "discount":
          return b.discountInPercent - a.discountInPercent;
        default:
          return 0;
      }
    });

    const filteredResult: Product_t[] = [];
    for (let product of result) {
      if (
        product.price <= filter.price &&
        product.discountInPercent <= filter.discount &&
        product.deliveryCharges <= filter.delivery
      ) {
        filteredResult.push(product);
      }
    }

    setSortedProducts(filteredResult);
  }, [products, activeSort, filter]);

  useEffect(() => {
    let maxPrice: number = 0;
    let maxDelivery: number = 0;
    let maxDiscount: number = 0;
    for (let product of products) {
      if (product.price > maxPrice) {
        maxPrice = product.price;
      }
      if (product.deliveryCharges > maxDelivery) {
        maxDelivery = product.deliveryCharges;
      }
      if (product.discountInPercent > maxDiscount) {
        maxDiscount = product.discountInPercent;
      }
    }

    setFilter({
      price: maxPrice,
      delivery: maxDelivery,
      discount: maxDiscount,
    });
    setMaxFilter({
      price: maxPrice,
      delivery: maxDelivery,
      discount: maxDiscount,
    });
  }, [products]);

  return (
    <div id="Listing-component">
      <Topbar />
      <div id="body">
        <div id="left">
          <div className="section">
            <div className="heading">Sort by</div>
            <div className="content">
              <div
                className={"option " + (activeSort === "stars" ? "active" : "")}
                onClick={() => setActiveSort("stars")}
              >
                <span className="stars">Stars Given</span>
              </div>
              <div
                className={"option " + (activeSort === "price" ? "active" : "")}
                onClick={() => setActiveSort("price")}
              >
                <span className="price">Price</span>
              </div>
              <div
                className={
                  "option " + (activeSort === "delivery" ? "active" : "")
                }
                onClick={() => setActiveSort("delivery")}
              >
                <span>Delivery Charge</span>
              </div>
              <div
                className={
                  "option " + (activeSort === "discount" ? "active" : "")
                }
                onClick={() => setActiveSort("discount")}
              >
                <span>Discount</span>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="heading">Price</div>
            <div className="content">
              <input
                type="range"
                min={1}
                max={maxFilter.price}
                value={filter.price}
                onChange={(e) => {
                  setFilter({ ...filter, price: +e.target.value });
                }}
              />
            </div>
          </div>
          <div className="section">
            <div className="heading">Discount</div>
            <div className="content">
              <input
                type="range"
                min={1}
                max={100}
                value={filter.delivery}
                onChange={(e) => {
                  setFilter({ ...filter, delivery: +e.target.value });
                }}
              />
            </div>
          </div>
          <div className="section">
            <div className="heading">Delivery charges</div>
            <div className="content">
              <input
                type="range"
                min={1}
                max={90}
                value={filter.discount}
                onChange={(e) => {
                  setFilter({ ...filter, discount: +e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div id="right">
          <div className="category">{toTitleCase(params.category)}</div>
          <div className="allProducts">
            {sortedProducts.map((product, i) => {
              return <ProductCard key={i} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
