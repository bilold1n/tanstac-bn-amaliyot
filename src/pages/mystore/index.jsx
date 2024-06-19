import React from "react";
import { useStore } from "../../apps/myzustand";

export default function Mystore() {
  const { addtocart, cart, increment, decrement } = useStore((state) => state);
  console.log(addtocart);

  return <div>salom</div>;
}
