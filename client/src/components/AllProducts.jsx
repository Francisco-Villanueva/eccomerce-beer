import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const AllProducts = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <div className="columns is-multiline is-centered">
      {books.map((book) => {
        const thumbnail = book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.smallThumbnail
          : "https://cdn-icons-png.flaticon.com/512/2421/2421033.png";
  
        return (
          <div className="column is-one-fifth" key={book.id}>
            <Link
              to={`user/products/${book.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img
                      src={thumbnail}
                      alt={book.volumeInfo.title}
                      style={{ height: "366px" }}
                    />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="content">
                    {book.volumeInfo.title}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

