import React, { useContext, useEffect } from "react";
import Cards from "../commons/Cards/Card";
import Loading from "../commons/Cards/Loading";
import { AuthContext } from "../contexts/AuthContext";

export const AllProducts = () => {
  const { books, searchedBooks, carrito } = useContext(AuthContext);
  const booksToShow = searchedBooks.length > 0 ? searchedBooks : books;

  return (
    <div className="grilla_libros">
      {booksToShow && booksToShow.length ? ( // cambie esto
        booksToShow.map((book, index) => {
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
