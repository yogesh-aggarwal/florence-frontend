import "./Home.scss"

import { useState } from "react"
import { ProductCard } from "../Components/ProductCard"
import { FLORAL_ODOR_IMAGE_MAP } from "../Lib/Constants"
import { useUser } from "../Lib/State"
import { Product_t } from "../Lib/Types/product"
import { useNetworkRequest } from "../Lib/helpers"
//

namespace Components {}

function ProductByColor(props: { proArr: Product_t[] | null }) {
   if (props.proArr)
      return (
         <>
            {props.proArr.map((pro, i) => {
               return <ProductCard key={i} product={pro} />
            })}
         </>
      )
}

export default function Home() {
   const user = useUser()
   const [festive, setFestive] = useState<null | Record<string, Product_t[]>>(null)
   const [recommended, setRecommended] = useState<null | Product_t[]>(null)
   const [colorProducts, setColorProduct] = useState<null | Record<string, Product_t[]>>(null)
   const [currentImage, setCurrentImage] = useState<null | string>(null)
   const [currentColor, setCurrentColor] = useState<null | string>(null)
   const [productsOnColor, setProductOnColor] = useState<null | Product_t[]>(null)
   const [productsOnOdor, setProductOnOdor] = useState<null | Product_t[]>(null)
   const [floral, setFloral] = useState<null | Record<string, Product_t[]>>(null)

   useNetworkRequest("POST", "/getHomeData", { email: user?.email }, async (data: Response) => {
      const body = await data.json()
      const res = body["response"]
      let keys = Object.keys(res)
      setRecommended(res["recommendedProducts"])
      setFestive(res[keys[0]])
      setColorProduct(res[keys[1]])
      setFloral(res[keys[2]])

      scrollTo({ top: 0, behavior: "instant" })
   })

   return (
      <div className="HomeComponent">
         {/* <div className="banner"></div> */}
         {recommended ? (
            <div className="section">
               <div className="category">✨ Recommended Products Based On Your Choice</div>
               <div className="allProducts">
                  {recommended.map((pro, i) => {
                     return <ProductCard key={i} product={pro} />
                  })}
               </div>
            </div>
         ) : (
            <div></div>
         )}
         {festive ? (
            <div className="section">
               <div className="category">This Festive Season</div>
               <div className="allProducts">
                  {festive["all"].map((pro, i) => {
                     return <ProductCard key={i} product={pro} />
                  })}
               </div>
            </div>
         ) : (
            <div></div>
         )}
         {colorProducts ? (
            <div className="section">
               <div className="category">Choose according To Your Prefered Colour</div>
               <div className="allProducts category-section">
                  <div className="colors">
                     {Object.keys(colorProducts).map((color, i) => {
                        return (
                           <>
                              <div
                                 className={"color " + (currentColor === color ? "active" : "")}
                                 key={i}
                                 style={{ backgroundColor: color }}
                                 onClick={() => {
                                    setProductOnColor(colorProducts[color])
                                    setCurrentColor(color)
                                 }}
                              >
                                 {color.charAt(0).toUpperCase() + color.slice(1)}
                              </div>
                           </>
                        )
                     })}
                  </div>
                  <div className="products">
                     <ProductByColor proArr={productsOnColor} />
                     <ProductByColor proArr={productsOnColor} />
                  </div>
               </div>
            </div>
         ) : (
            <div></div>
         )}
         {floral ? (
            <div className="section">
               <div className="category">Choose according To Your Prefered Fragnance</div>
               <div className="allProducts category-section">
                  <div className="colors">
                     {Object.keys(floral).map((odor, i) => {
                        return (
                           <>
                              <div
                                 className={"color " + (currentImage === odor ? "active" : "")}
                                 key={i}
                                 style={{ backgroundColor: odor }}
                                 onClick={() => {
                                    setProductOnOdor(floral[odor])
                                    setCurrentImage(odor)
                                 }}
                              >
                                 <img src={FLORAL_ODOR_IMAGE_MAP[odor]} alt="" />
                                 <span>{odor.charAt(0).toUpperCase() + odor.slice(1)}</span>
                              </div>
                           </>
                        )
                     })}
                  </div>
                  <div className="products">
                     <ProductByColor proArr={productsOnOdor} />
                  </div>
               </div>
            </div>
         ) : (
            <div></div>
         )}
      </div>
   )
}
