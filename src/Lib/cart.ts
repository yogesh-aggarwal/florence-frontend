import { cartStore } from "./State";

export namespace Cart {
  export function add(productID: string) {
    const cart = cartStore.value({ clone: true });

    if (!cart[productID]) {
      cart[productID] = 1;
    } else {
      cart[productID]++;
    }

    cartStore.set(cart);
  }

  export function deleteProduct(productId: string) {
    let cart = { ...cartStore.value() };
    cart[productId]--;

    if (cart[productId] === 0) delete cart[productId];

    cartStore.set(cart);
  }

  export function clear() {
    cartStore.set({});
  }
}
