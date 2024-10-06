import "./Wishlist.scss"

import { useState } from "react"
import { useUser } from "../Lib/State"
import { Product_t } from "../Lib/Types/product"
import { useNetworkRequest } from "../Lib/helpers"
import { ProductCard } from "../Components/ProductCard"
import img from "../Assets/wishlist.svg"

export default function Wishlist() {
   const user = useUser()
   if (user?.wishlist) {
      if (user?.wishlist.length < 1) {
         console.log("hello")
         return (
            <div className="img">
               <img src={img} alt="" />
               <div className="msg">‪‪❤︎‬ To Add Items</div>
            </div>
         )
      }
   }

   const [wishListedProducts, setWishlististedProducts] = useState<Product_t[]>([])

   useNetworkRequest("POST", "/getProductsByIdsWishlist", { Wishlist: user?.wishlist }, async (res) => {
      if (user?.wishlist) {
         if (user?.wishlist.length < 1) {
            return
         }
         const wishListedProducts = (await res.json()).data
         console.log(wishListedProducts)
         if (wishListedProducts) {
            setWishlististedProducts(wishListedProducts)
         }
      }
   })

   return (
      <div className="WishlistComponent">
         <div className="allProducts">
            {wishListedProducts.map((product, i) => {
               return <ProductCard key={i} product={product} />
            })}
         </div>
      </div>
   )
}
