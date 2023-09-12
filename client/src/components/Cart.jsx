import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { CartBooksContext } from "../contexts/CartBookContext";
import axios from "axios";
import Navbar from "../commons/Navbar";
import CardButtons from "../commons/CardButtons";
import Loading from "../commons/Cards/Loading";

export const Cart = () => {
  const { carrito } = useContext(AuthContext);

  // const { setUser } = useContext(AuthContext);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/admin/users/${userId}`)
  //     .then((response) => {
  //       const user = response.data;
  //       setCarrito(user.user_cartBuy);
  //     })
  //     .catch((error) => {
  //       console.error("Error al verificar el token:", error);
  //     });
  // }, []);

  return (
    <div>
      <Navbar />
      {carrito.length ? (
        carrito.map((book, index) => (
          <div key={index}>
            <div className="individual" style={{ width: "820px" }}>
              <div className="card-content">
                <div className="columns">
                  <div className="column is-one-third">
                    <img
                      src={book.image}
                      alt={book.title}
                      style={{ height: "366px" }}
                    />
                  </div>
                  <div className="column">
                    <h1 className="title is-3">{book.title || "No Title"}</h1>
                    {/* 
                    <p>
                      <span className="title is-6">Authors:</span>{" "}
                      {book.volumeInfo.authors?.join(", ") || "Not Authors"}
                    </p>
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
                      {book.volumeInfo.categories?.join(", ") ||
                        "Not Categories"}
                    </p>
                    <p>
                      <span className="title is-6">Language:</span>{" "}
                      {book.volumeInfo.language || "Unknown"}
                    </p>
                    <p> */}
                    <span className="title is-6">Price:</span>{" "}
                    {`$${book.price}` || "Unknown"}
                    <CardButtons book={book} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};
