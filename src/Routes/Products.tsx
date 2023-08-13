import "./Products.scss";

import { useParams } from "react-router-dom";

export default function Products() {
  const params = useParams();
  console.log(params);

  return <div className="ProductsComponent">Products</div>;
}
