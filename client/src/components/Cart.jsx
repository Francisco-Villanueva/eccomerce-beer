import React from 'react'
import { useContext, useEffect } from "react";
import { CartBooksContext } from "../contexts/CartBookContext";

export const Cart = () => {
  const { cartBooks } = useContext(CartBooksContext);




  return (
    <div>
      Cart
      {/* {cartBooks.map((book) => {
      })} */}
    </div>
  )
}
