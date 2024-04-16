import { useEffect, useState } from "react";
import { useUser } from "../Lib/State";
import "./Wishlist.scss";
import { Product_t } from "../Lib/Types/product";
import { ProductCard } from "../components/ProductCard";
import { networkRequest, useNetworkRequest } from "../Lib/helpers";

export default function Wishlist() {
  const user = useUser();
  if (!user?.wishlist) {
    console.log(user?.wishlist)
    return <></>;
  }
  console.log();
  const [wishListedProducts, setWishlististedProducts] = useState<Product_t[]>(
    []
  );

  useNetworkRequest(
    "POST",
    "/getProductsByIdsWishlist",
    { Wishlist: user?.wishlist },
    async (res) => {
      if (user?.wishlist) {
        if (user?.wishlist.length < 1) {
          return;
        }
        const wishListedProducts = (await res.json()).data;
        console.log(wishListedProducts);
        if (wishListedProducts) {
          setWishlististedProducts(wishListedProducts);
        }
      }
    }
  );

  return (
    <div className="WishlistComponent">
      <div className="allProducts">
        {wishListedProducts.map((product, i) => {
          return <ProductCard key={i} product={product} />;
        })}
      </div>
    </div>
  );
}
