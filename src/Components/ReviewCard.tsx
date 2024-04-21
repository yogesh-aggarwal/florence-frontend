import { useCallback, useMemo } from "react";
import { ProductReview_t } from "../Lib/Types/product";
import "./ReviewCard.scss";

export function ReviewCard(props: { productReview: ProductReview_t }) {
  const ratingBackground = useMemo(() => {
    let stars = props.productReview.starsGiven;
    if (stars >= 3) return "green";
    else return "red";
  }, [props.productReview]);

  
  return (
    <div className="ReviewCard-component">
      <div className="left">
        <div className="dp">{props.productReview.name.charAt(0)}</div>
        <div className="name">{props.productReview.name}</div>
      </div>
      <div className="right">
        <div className={`stars ${ratingBackground}`}>
          <div className="starNum">{props.productReview.starsGiven}</div>
          <i className="fi fi-sr-star"></i>
        </div>
        <div className="review">{props.productReview.review}</div>
        <div className="whenReviewed">{props.productReview.whenReviewed}</div>
      </div>
    </div>
  );
}
