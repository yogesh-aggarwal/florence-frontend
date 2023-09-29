import { makeStore } from "common-react-toolkit";
import { Product_t } from "./Types/product";
import { User_t } from "./Types/user";

export const [userStore, useUser] = makeStore<User_t | null>(
  null,
  {},
  { storeID: "user" }
);

export const [productsStore, useProducts] = makeStore<Product_t[]>(
  [],
  {},
  { storeID: "products" }
);

// CRUD -> store (R: one time)
// R -> useStore (R: real time)

// let cart = {};
// cart = { a: 1 };

export const [cartStore, useCart] = makeStore<Record<string, number>>(
  {},
  {},
  { storeID: "cart" }
);
