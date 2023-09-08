import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartBooksContext } from "../contexts/CartBookContext";

export const Cart = () => {
  const { cartBooks } = useContext(CartBooksContext);

  console.log(cartBooks);
  return (
    <div>
      {cartBooks[0]?.map((m, index) => (
        <p key={index}>{m.volumeInfo?.title}</p>
      ))}
    </div>
  );
};
