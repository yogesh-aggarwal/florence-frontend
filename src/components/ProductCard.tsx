import "./ProductCard.scss";

import { useNavigate } from "react-router-dom";
import { Product_t } from "../Lib/Types/product";

export function ProductCard(props: { product: Product_t }) {
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
