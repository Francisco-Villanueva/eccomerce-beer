import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const CartBooksContext = createContext();

export function useCartBooks() {
  return useContext(CartBooksContext);
}

const userId = localStorage.getItem("userId");

export function CartBooksProvider({ children }) {
  const [cartBooks, setCartBooks] = useState([]);

  const addToCart = (id) => {
    axios
      .post(`http://localhost:4000/cart/add/${id}/${userId}`)
      .then((res) => setCartBooks((prevBooks) => [...prevBooks, res.data]))
      .catch((err) => console.log(err));
  };

  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:4000/cart/remove/${id}/${userId}`)
      .then((res) =>
        setCartBooks((prevBooks) =>
          prevBooks.filter((book) => book.id !== id)
        )
      );
  };

  return (
    <CartBooksContext.Provider value={{ cartBooks, addToCart, removeFromCart }}>
      {children}
    </CartBooksContext.Provider>
  );
}
