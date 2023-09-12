import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import Navbar from "../commons/Navbar";
import CardButtons from "../commons/CardButtons";
import Loading from "../commons/Cards/Loading";

export const Cart = () => {
  const { carrito } = useContext(AuthContext);
  const [bookQuantities, setBookQuantities] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:4000/admin/users/${userId}`)
        .then((response) => {
          const userCart = response.data.user_cartBuy;
          const quantities = {};

          userCart.forEach((book) => {
            const matchingBook = cartBooks.find(
              (cartBook) => cartBook.id === book.bookId
            );

            if (matchingBook) {
              quantities[book.bookId] = {
                count: book.count,
                price: matchingBook.price,
              };
            }
          });

          setBookQuantities(quantities);
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
        });
    }
  }, [userId, cartBooks]);

  const handleQuantityChange = (bookId, newQuantity) => {
    setBookQuantities({
      ...bookQuantities,
      [bookId]: {
        ...bookQuantities[bookId],
        count: newQuantity,
      },
    });
  };

  useEffect(() => {
    let sum = 0;
    for (const bookId in bookQuantities) {
      sum += bookQuantities[bookId].count;
    }
    setTotalProducts(sum);
  }, [bookQuantities]);

  const totalPrice = cartBooks.reduce(
    (total, book) =>
      total + (bookQuantities[book.id]?.count * book.price),
    0
  );

  console.log(bookQuantities);

  return (
    <div>
      <Navbar />
      <div className="columns">
        <div className="column is-three-quarters">
          {cartBooks ? (
            cartBooks.map((book, index) => (
              <div key={index}>
                <div className="individual" style={{ width: "820px" }}>
                  <div className="card-content">
                    <div className="columns">
                    <div
                      className="column is-one-quarter"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img style={{objectFit: "contain"}}
                        src={
                          book?.volumeInfo.imageLinks?.smallThumbnail ||
                          "https://cdn-icons-png.flaticon.com/512/2421/2421033.png"
                        }
                        alt={book.volumeInfo.title}
                      />
                    </div>
                    <div className="column">
                      <h1 className="title is-4">
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
                        <span className="title is-6">Price:</span>{" "}
                        {`$${book.price}` || "Unknown"}
                      </p>
                      <CardButtons book={book} />
                    </div>
                    <div
                      className="column is-one-quarter"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <input
                        type="number"
                        style={{ height: "30px", width: "100px" }}
                        value={
                          (bookQuantities[book.id] &&
                            bookQuantities[book.id].count) ||
                          1
                        }
                        onChange={(e) =>
                          handleQuantityChange(book.id, parseInt(e.target.value))
                        }
                      />{" "}
                    </div>
                    <div className="column is-one-quarter">
                      <p>
                        <span className="title is-6">Precio parcial:</span>{" "}
                        {`$${(bookQuantities[book.id]?.count || 1) *
                          book.price}`}
                      </p>
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

        <div className="column is-one-quarter">
          <p className="title is-4">Resumen de Compra</p>
          <p>
            Productos ({totalProducts})
            <br />
            Precio Total: ${totalPrice}
          </p>
        </div>
      </div>
    </div>
  );
};
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
