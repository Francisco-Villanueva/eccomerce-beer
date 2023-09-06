import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { items } from "../mocks/books.json";

export const AllProducts = () => {
  const [books, setBooks] = useState(items);

  console.log(items[0].volumeInfo.imageLinks.thumbnail);

  // useEffect(() => {
  //   axios
  //     .get("/rutaMostrarTodosLosLibros")
  //     .then((res) => {
  //       setBooks(res.data.items);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <>
      {books.map((book) => {
        const thumbnail = book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.smallThumbnail
          : "https://cdn-icons-png.flaticon.com/512/3068/3068077.png";

        return (
          <Link to={`/${book.id}`} key={book.id} style={{textDecoration: "none", color: "inherit"}}>
            <div>
              <img src={thumbnail} alt={book.volumeInfo.title} style={{width: "140px", height: "183px"}}/>
              <p>{book.volumeInfo.title}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
};
