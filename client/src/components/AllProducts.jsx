import React, { useContext } from "react";
import Cards from "../commons/Cards/Card";
import Loading from "../commons/Cards/Loading";
import { AuthContext } from "../contexts/AuthContext";

export const AllProducts = () => {
  const { books, searchedBooks, carrito } = useContext(AuthContext);

  // console.log(carrito);
  const booksToShow = searchedBooks.length > 0 ? searchedBooks : books;
  return (
    <div className="grilla_libros">
      {books && books.length ? (
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
