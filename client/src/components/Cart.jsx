import React from 'react'
import { useContext, useEffect } from "react";
import { CartBooksContext } from "../contexts/CartBookContext";

export const Cart = () => {
  const { cartBooks } = useContext(CartBooksContext);

  console.log(cartBooks);

  return (
    <div>
      {cartBooks.map((book) => {
        <p key={book.id}>{book.volumeInfo.title}</p>
      })}
    </div>
  )
}
