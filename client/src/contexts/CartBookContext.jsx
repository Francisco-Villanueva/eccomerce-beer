import React, { createContext, useContext, useEffect, useState } from "react";

export const CartBooksContext = createContext();


export function useCartBooks() {
  return useContext(CartBooksContext);
}

export function CartBooksProvider({ children }) {
  const [cartBooks, setCartBooks] = useState([]);

  const addToCart = (book) => {
    setCartBooks((prevBooks) => [...prevBooks, book]);
  };

  const removeFromCart = (bookId) => {
    setCartBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== bookId)
    );
  };

  return (
    <CartBooksContext.Provider
      value={{ cartBooks, addToCart, removeFromCart }}
    >
      {children}
    </CartBooksContext.Provider>
  );
}