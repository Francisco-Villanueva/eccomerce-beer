import React, { useContext, useEffect } from "react";
import Cards from "../commons/Cards/Card";
import Loading from "../commons/Cards/Loading";
import { AuthContext } from "../contexts/AuthContext";

export const AllProducts = ({ selectedCategories }) => {
  const { books, searchedBooks, carrito } = useContext(AuthContext);

  
  const filteredBooks = books.filter((book) => {

    if (selectedCategories.length === 0) {
      return true;
    }

    if (book.categories && Array.isArray(book.categories)) {

      return selectedCategories.every((selectedCategory) =>
        book.categories.includes(selectedCategory)
      );
    }

    return true;
  });


  const booksToShow = searchedBooks.length > 0 ? searchedBooks : filteredBooks;

  console.log(booksToShow);
  return (
    <div className="grilla_libros">
      {booksToShow.length ? (
        booksToShow.map((book, index) => {
          return (
            <div className="column" key={index}>
              <Cards book={book} />
            </div>
          );
        })
      ) : (
        <p>Not Found</p>
      )}
    </div>
  );
};