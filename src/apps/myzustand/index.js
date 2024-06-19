import { create } from "zustand";

export const useStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem("cart")) ?? [],

  deleteitem: (id) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  increment: (id) =>
    set((state) => {
      const itemIndex = state.cart.findIndex((item) => item.id === id);
      if (itemIndex === -1) return state;
      const newCart = [...state.cart];
      newCart[itemIndex] = {
        ...newCart[itemIndex],
        count: newCart[itemIndex].count + 1,
      };
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  decrement: (id) =>
    set((state) => {
      const itemIndex = state.cart.findIndex((item) => item.id === id);
      if (itemIndex === -1) return state;
      const newCart = [...state.cart];
      if (newCart[itemIndex].count > 1) {
        newCart[itemIndex] = {
          ...newCart[itemIndex],
          count: newCart[itemIndex].count - 1,
        };
      } else {
        newCart.splice(itemIndex, 1);
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
  addNewProduct: (id, title, price, img) =>
    set((state) => {
      const newProduct = { id, title, price, img, count: 1 };
      const newCart = [...state.cart, newProduct];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    }),
}));
