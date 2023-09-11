import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cards from "../commons/Cards/Card";
import Loading from "../commons/Cards/Loading";
import { CartBooksContext } from "../contexts/CartBookContext";

export const AllProducts = () => {
  // const [books, setBooks] = useState([]);

  const { books, setBooks } = useContext(CartBooksContext);
  useEffect(() => {
    axios
      .get("http://localhost:4000/user/products")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(books[0]);

  return (
    <div className="grilla_libros">
      {books.length ? (
        books.map((book, index) => {
          return (
            <div className="column" key={index}>
              <Cards book={book} />
            </div>
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
};
