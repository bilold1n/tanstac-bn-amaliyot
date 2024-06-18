import { create } from "zustand";

export const useStore = create((set) => ({
  count: 0,
  //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  //   removeAllBears: () => set({ bears: 0 }),
  //   updateBears: (newBears) => set({ bears: newBears }),
  cart: JSON.parse(localStorage.getItem("cart")) ?? [],
  addtocart: (id) =>
    set((state) => ({ ...state, cart: [...state.cart, { id, count: 1 }] })),
  deleteitem: (id) =>
    set(
      (state) => (state.cart = [...state.cart.filter((item) => item.id !== id)])
    ),
  increment: (id) =>
    set((state) => ({
      ...state,
      cart: (state.cart[findIndex((item) => item.id === id)].count += 1),
    })),

  // decrement: (state, { payload }) => {
  //   const index = state.cart.findIndex((item) => item.id === payload);
  //   state.cart[index].count -= 1;
  //   localStorage.setItem("cart", JSON.stringify(state.cart));
  // },
}));
