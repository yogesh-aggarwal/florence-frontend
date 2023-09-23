export type ProductDescription_t = {
  type: "para" | "list";
  content: string | string[];
};

export type ProductReview_t = {
  id: string;
  userID: string;
  starsGiven: number;
  review: string;
  whenReviewed: string;
};

export type Product_t = {
  _id: string;
  title: string;
  price: number;
  images: string[];
  description: ProductDescription_t[];
  deliveryInfo: ProductDescription_t[];
  careInstructions: ProductDescription_t[];
  discountInPercent: number;
  stock: number;
  deliveryCharges: number;
  starRatings: number;
  reviews: ProductReview_t[];
};
