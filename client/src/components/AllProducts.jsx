import React, { useContext } from "react";
import Cards from "../commons/Cards/Card";
import Loading from "../commons/Cards/Loading";
import { AuthContext } from "../contexts/AuthContext";

export const AllProducts = () => {
  const { books, Search } = useContext(AuthContext);

  return (
    <div className="grilla_libros">
      {books && books.length ? (
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
