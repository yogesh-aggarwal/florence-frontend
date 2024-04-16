import "./Home.scss";

import { useState } from "react";
import { useUser } from "../Lib/State";
import { Product_t } from "../Lib/Types/product";
import { useNetworkRequest } from "../Lib/helpers";
import { ProductCard } from "../Components/ProductCard";
//

function ProductByColor(props: { proArr: Product_t[] | null }) {
  if (props.proArr)
    return (
      <>
        {props.proArr.map((pro, i) => {
          return <ProductCard key={i} product={pro} />;
        })}
      </>
    );
}

function getFloralImageURL(name: string) {
  switch (name) {
    case "sweet":
      return "https://imgcdn.floweraura.com/tender-pink-roses-bouquet-9814150fl-D_0.jpg";
    case "woody":
      return "https://cdn-dldnm.nitrocdn.com/svFXjgmMzugOETATAfAvgBbvtKUsMYLh/assets/images/optimized/rev-1f3e2d7/www.czechandspeake.com/fragrance/wp-content/uploads/2019/10/Wood-intersection-scaled.jpg";
    default:
      return "";
  }
}

export default function Home() {
  const user = useUser();
  const [festive, setFestive] = useState<null | Record<string, Product_t[]>>(
    null
  );
  const [recommended, setRecommended] = useState<null | Product_t[]>(null);
  const [colorProducts, setColorProduct] = useState<null | Record<
    string,
    Product_t[]
  >>(null);
  const [currentImage, setCurrentImage] = useState<null | string>(null);
  const [currentColor, setCurrentColor] = useState<null | string>(null);
  const [productsOnColor, setProductOnColor] = useState<null | Product_t[]>(
    null
  );
  const [productsOnOdor, setProductOnOdor] = useState<null | Product_t[]>(null);
  const [floral, setFloral] = useState<null | Record<string, Product_t[]>>(
    null
  );

  useNetworkRequest(
    "POST",
    "/getHomeData",
    { email: user?.email },
    async (data: Response) => {
      const body = await data.json();
      const res = body["response"];
      let keys = Object.keys(res);
      console.log(res["user"]);
      // userStore.set({
      //   _id: res["user"]["_id"],
      //   email: res["user"]["email"],
      //   name: res["user"]["name"],
      //   password: res["user"]["password"],
      //   deliveryAddresses: res["user"]["deliveryAddresses"],
      //   mobileNumbers: res["user"][" mobileNumbers"],
      //   dp: res["user"]["dp"],
      //   wishlist : res["user"]["wishlist"]}
      // )
      setRecommended(res["recommendedProducts"]);
      setFestive(res[keys[0]]);
      setColorProduct(res[keys[1]]);
      setFloral(res[keys[2]]);

      scrollTo({ top: 0, behavior: "instant" });
    }
  );
  let arr: number[] = [];

  return (
    <div className="HomeComponent">
      {/* <div className="banner"></div> */}
      {recommended ? (
        <div className="section">
          <div className="category">
            ✨ Recommended Products Based On Your Choice
          </div>
          <div className="allProducts">
            {recommended.map((pro, i) => {
              return <ProductCard key={i} product={pro} />;
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
              return <ProductCard key={i} product={pro} />;
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      {colorProducts ? (
        <div className="section">
          <div className="category">
            Choose according To Your Prefered Colour
          </div>
          <div className="allProducts category-section">
            <div className="colors">
              {Object.keys(colorProducts).map((color, i) => {
                return (
                  <>
                    <div
                      className={
                        "color " + (currentColor === color ? "active" : "")
                      }
                      key={i}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setProductOnColor(colorProducts[color]);
                        setCurrentColor(color);
                      }}
                    >
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </div>
                  </>
                );
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
          <div className="category">
            Choose according To Your Prefered Fragnance
          </div>
          <div className="allProducts category-section">
            <div className="colors">
              {Object.keys(floral).map((odor, i) => {
                return (
                  <>
                    <div
                      className={
                        "color " + (currentImage === odor ? "active" : "")
                      }
                      key={i}
                      style={{ backgroundColor: odor }}
                      onClick={() => {
                        setProductOnOdor(floral[odor]);
                        setCurrentImage(odor);
                      }}
                    >
                      <img src={getFloralImageURL(odor)} alt="" />
                      <span>
                        {odor.charAt(0).toUpperCase() + odor.slice(1)}
                      </span>
                    </div>
                  </>
                );
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
      {/* <div className="section">
        <div className="category">Birthday</div>
        <div className="allProducts">
          {arr.map((i) => {
            return <ProductCard key={i} product={SAMPLE_PRODUCT} />;
          })}
        </div>
      </div>
      <div className="section">
        <div className="category">Love & Romance</div>
        <div className="allProducts">
          {arr.map((i) => {
            return <ProductCard key={i} product={SAMPLE_PRODUCT} />;
          })}
        </div>
      </div>
      <div className="section">
        <div className="category">Anniversary</div>
        <div className="allProducts">
          {arr.map((i) => {
            return <ProductCard key={i} product={SAMPLE_PRODUCT} />;
          })}
        </div>
      </div>
      <div className="section">
        <div className="category">Celebration</div>
        <div className="allProducts">
          {arr.map((i) => {
            return <ProductCard key={i} product={SAMPLE_PRODUCT} />;
          })}
        </div>
      </div>
      <div className="section">
        <div className="category">Sympathy & Funeral</div>
        <div className="allProducts">
          {arr.map((i) => {
            return <ProductCard key={i} product={SAMPLE_PRODUCT} />;
          })}
        </div>
      </div> */}
    </div>
  );
}
