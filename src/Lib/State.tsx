import { makeStore } from "common-react-toolkit";
import { User_t } from "./Types/user";
import { Product_t } from "./Types/product";

export const [userStore, useUser] = makeStore<User_t | null>(null);

export const [productsStore, useProducts] = makeStore<Product_t[]>(
  [],
  {},
  { storeID: "products" }
);
