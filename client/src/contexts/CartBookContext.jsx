import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const CartBooksContext = createContext();

export function useCartBooks() {
  return useContext(CartBooksContext);
}

const userId = localStorage.getItem("userId");

export function CartBooksProvider({ children }) {
  const [cartBooks, setCartBooks] = useState([]);
  const [books, setBooks] = useState([]);

  const addToCart = (id) => {
    axios
      .post(`http://localhost:4000/cart/add/${id}/${userId}`)
      .then((user) => {
        console.log(user);
        message.success("Agregado a carrito", 1);
      })
      .catch((err) => console.log(err));
  };

  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:4000/cart/remove/${id}/${userId}`)
      .then(() => console.log("eliminado"));
  };

  const setCarrito = async (carrito) => {
    const arrayOfBooksId = carrito.map((m) => m.bookId);

    // console.log("Inicio FAVORITES: ", arrayOfMoviesId);

    const fetchBookDetail = async (bookId) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/products/${bookId}`
        );

        return response.data; // Suponiendo que los detalles de la película se encuentren en response.data
      } catch (error) {
        console.error("Error al obtener detalles de la película:", error);
        // return null;
      }
    };

    // Función para obtener los detalles de todas las películas en arrayOfMoviesId
    const fetchAllBooksDetails = async () => {
      try {
        const detailsPromises_Books = arrayOfBooksId.map((movieId) =>
          fetchBookDetail(movieId)
        ); //ARREGLO DE PROMESAS, CADA PROMESA TRAE EL DETALLE DEL LIBRO.

        const books_Details = await Promise.all(detailsPromises_Books);

        // console.log("EN PROMISE ALL", { movieDetailsArray });

        // console.log("DATA DEL CARRITO : ", books_Details);

        // setCartBooks((prevBooks) => [...prevBooks, books_Details]);

        setCartBooks(books_Details);

        return { books_Details };
      } catch (error) {
        console.log({ error });
      }
    };

    fetchAllBooksDetails();
  };

  return (
    <CartBooksContext.Provider
      value={{
        cartBooks,
        addToCart,
        removeFromCart,
        setCarrito,
        setBooks,
        books,
      }}
    >
      {children}
    </CartBooksContext.Provider>
  );
}
