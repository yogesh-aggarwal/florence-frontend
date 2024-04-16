import "./ProductCard.scss";

import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, userStore } from "../Lib/State";
import { Product_t } from "../Lib/Types/product";
import { networkRequest } from "../Lib/helpers";

export function ProductCard(props: { product: Product_t }) {
  const user = useUser();
  const navigate = useNavigate();

  const wishlistIcon = useMemo(() => {
    if (!user) return ""

    if (user.wishlist.includes(props.product.id)) {
      return "fi fi-sr-heart"
    } else {
      return "fi fi-rr-heart"
    }
  }, [user?.wishlist])

  const handleWishlistButtonClick = useCallback(async () => {
    // to check if user even exists or not. ik check krne ki need nhi h bt typescript ke errors se bach jaoge ki user can b undefined and faltu ki ?. wali chaining se
    if (!user) return;

    // y var m bahar isliye bana rha hu cz badme sirf back pe bhejna h and wo processs both if and else me common h toh wo m dono k bahar karunga
    let newWishlist: string[] = [];
    if (user.wishlist.includes(props.product.id)) {
      // remove from the wishlist
      newWishlist = user.wishlist.filter((x) => x !== props.product.id);
    } else {
      // add to wishlist
      newWishlist = [...user.wishlist, props.product.id];
    }

    // locally network pe request krne se pehle update kr diya to prevent laggy experience. if in case request fail krti h badme to revert kr denge.
    // in case successful ho gyi toh best h.
    const prevWishlist = [...user.wishlist]; // i m creating a copy of the array taking by reference wala koi panga na pade
    userStore.merge({ wishlist: newWishlist });

    // Send the updated list to backend
    const res = await networkRequest("POST", "/updateWishlist", {
      email: user?.email,
      wishlist: newWishlist,
    });
    if (res.status !== 200) {
      userStore.merge({ wishlist: prevWishlist });
    }
  }, [user?.wishlist]);

  return (
    <div className="product">
      {user && (
        <div className="like" onClick={handleWishlistButtonClick}>
          <i className={wishlistIcon}></i>
        </div>
      )}
      <div
        className="image"
        onClick={() => {
          navigate(`/product/${props.product.id}`);
        }}
      >
        <img src={props.product.images[0]} />
      </div>
      <div
        className="prodInfo"
        onClick={() => {
          navigate(`/product/${props.product.id}`);
        }}
      >
        <div className="podTitle">
          {props.product.title.slice(0, 45).trim()}
          {props.product.title.length > 45 ? "..." : ""}
        </div>
        <div className="price">₹ {props.product.price}</div>
      </div>
    </div>
  );
}
