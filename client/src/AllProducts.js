import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const AllProducts = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("/rutaMostrarTodosLosLibros")
      .then((res) => {
        setBooks(res.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {books.map((book) => (
        <Link to={"/rutaMostrarUnLibro"} key={book.id}>
          <div>
            {/* <span>{book.volumeInfo.title}</span>
            <span>{book.volumeInfo.publisher}</span>
            <span>{book.volumeInfo.publishedDate}</span>
            <span>{book.volumeInfo.pageCount}</span>
            <span>{book.volumeInfo.averageRating}</span>
            <span>{book.volumeInfo.categories.join(", ")}</span>
            <span>{book.volumeInfo.language}</span>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            <span>{book.searchInfo.textSnippet}</span> */}
          </div>
        </Link>
      ))}
    </>
  );
};