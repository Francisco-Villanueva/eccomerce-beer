import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartBooksContext } from "../contexts/CartBookContext";

export const Cart = () => {
  const { cartBooks } = useContext(CartBooksContext);

  return (
    <div>
      {cartBooks[0]?.map((book, index) => (
        <div key={index}>
          <div className="individual" style={{ width: "820px" }}>
            <div className="card-content">
              <div className="columns">
                <div className="column is-one-third">
                  <img
                    src={
                      book.volumeInfo.imageLinks?.smallThumbnail ||
                      "https://cdn-icons-png.flaticon.com/512/2421/2421033.png"
                    }
                    alt={book.volumeInfo.title}
                    style={{ height: "366px" }}
                  />
                </div>
                <div className="column">
                  <h1 className="title is-3">
                    {book.volumeInfo.title || "No Title"}
                  </h1>
                  <p>
                    <span className="title is-6">Description:</span>{" "}
                    {book.volumeInfo.description
                      ? book.volumeInfo.description
                          .split("<br>")
                          .join("")
                          .slice(0, 150) + "..."
                      : "No Description"}
                  </p>
                  <p>
                    <span className="title is-6">Authors:</span>{" "}
                    {book.volumeInfo.authors?.join(", ") || "Not Authors"}
                  </p>
                  {/* <p>{book.volumeInfo.price}</p> */}
                  <p>
                    <span className="title is-6">Release Date:</span>{" "}
                    {book.volumeInfo.publishedDate || "Unknown"}
                  </p>
                  <p>
                    <span className="title is-6">Number of pages:</span>{" "}
                    {book.volumeInfo.pageCount || "Unknown"}
                  </p>
                  <p>
                    <span className="title is-6">Publisher:</span>{" "}
                    {book.volumeInfo.publisher || "Unknown"}
                  </p>
                  <p>
                    <span className="title is-6">Categories:</span>{" "}
                    {book.volumeInfo.categories?.join(", ") || "Not Categories"}
                  </p>
                  <p>
                    <span className="title is-6">Language:</span>{" "}
                    {book.volumeInfo.language || "Unknown"}
                  </p>
                  <p>
                    <span className="title is-6">Price:</span>{" "}
                    {`$${book.price}` || "Unknown"}
                  </p>
                  {/* <input /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
