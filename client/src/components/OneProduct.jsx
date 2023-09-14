import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { CartBooksContext } from "../contexts/CartBookContext";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const OneProduct = () => {
  const { id, bookId } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [isCart, setIsCart] = useState(false);
  const [editBook, setEditBook] = useState(false);
  const [deleteBook, setDeleteBook] = useState(true);
  const { cartBooks, addToCart, removeFromCart } = useContext(CartBooksContext);
  const { carrito } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user/products/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  function handleAddCart() {
    addToCart(id);
    setIsCart(true);
  }

  function handleRemoveCart() {
    removeFromCart(id);
    setIsCart(false);
  }

  function handleEditBook() {}

  function handleDeleteBook() {
    axios
      .delete(`http://localhost:4000/admin/books/${bookId}`)
      .then((res) => res.data)
      .then(() => {
        console.log("Libro eliminado exitosamente");
        setDeleteBook(false);
      })
      .catch((error) => {
        console.error("Error al eliminar el libro:", error);
      });
  }

  // VERIFICAR SI EXISTE LA ID EN EL CARRITO :
  // const aux = carrito.filter((e) => e.id !== id);
  // console.log(aux);
  // function isCartAux() {
  //   const aux = carrito.filter((e) => e.id === id);
  //   console.log(aux);

  //   if (aux.length === 0) {
  //     return;
  //   }
  // }

  // console.log(cartBooks);
  console.log(book);

  return (
    <div className="individual" style={{ width: "820px" }}>
      <div className="card-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
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
              <p>
                <span className="title is-6">Description:</span>{" "}
                {book.description
                  ? book.description.split("<br>").join("").slice(0, 150) +
                    "..."
                  : "No Description"}
              </p>
              <p>
                <span className="title is-6">Release Date:</span>{" "}
                {book.date || "Unknown"}
              </p>
              {/* <p>
                <span className="title is-6">Number of pages:</span>{" "}
                {book.volumeInfo.pageCount || "Unknown"}
              </p> */}
              {/* <p>
                <span className="title is-6">Publisher:</span>{" "}
                {book.volumeInfo.publisher || "Unknown"}
              </p> */}
              <p>
                <span className="title is-6">Categories:</span>{" "}
                {book.categories?.join(", ") || "Not Categories"}
              </p>
              {/* <p>
                <span className="title is-6">Language:</span>{" "}
                {book.volumeInfo.language || "Unknown"}
              </p> */}
              {/* <p>
                <span className="title is-6">Price:</span>{" "}
                {`$${book.price}` || "Unknown"}
              </p> */}

              {!isCart ? (
                <button
                  className="button"
                  style={{ margin: "10px 0px" }}
                  onClick={handleAddCart}
                >
                  <i
                    className="ti ti-garden-cart"
                    style={{ marginRight: "5px" }}
                  />
                  Add to Cart
                </button>
              ) : (
                <button
                  className="button"
                  style={{ margin: "10px 0px" }}
                  onClick={handleRemoveCart}
                >
                  <i
                    className="ti ti-garden-cart"
                    style={{ marginRight: "5px" }}
                  />
                  Remove to Cart
                </button>
              )}
              <Link to="/admin/editBook">
                <button
                  className="button"
                  style={{ margin: "10px 0px" }}
                  onClick={handleEditBook}
                >
                  <i
                    // className="ti ti-garden-cart"
                    style={{ marginRight: "5px" }}
                  />
                  Edit Book
                </button>
              </Link>
              <button
                className="button"
                style={{ margin: "10px 0px" }}
                onClick={handleDeleteBook}
              >
                <i
                  // className="ti ti-garden-cart"
                  style={{ marginRight: "5px" }}
                />
                Delete Book
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
