import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import Navbar from "../commons/Navbar";
import CardButtons from "../commons/CardButtons";
import Loading from "../commons/Cards/Loading";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { Paid } from "@mui/icons-material";
import { Link } from "react-router-dom";
import ProgressButton from "../commons/Progress_button/ProgessBotton";

export const Cart = () => {
  const { carrito, setCarrito, totalPrice, user, setCount } =
    useContext(AuthContext);
  // console.log("EN CART COMPONENT: ", carrito, totalPrice);
  const [bookQuantities, setBookQuantities] = useState({});
  const [totalProducts, setTotalProducts] = useState(0);

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
    setCarrito();
    // console.log("EFECTO, CARRITO \n ", carrito);
  }, [carrito.cart.length]);

  // console.log(totalPrice);

  useEffect(() => {
    let sum = 0;
    for (const bookId in bookQuantities) {
      sum += bookQuantities[bookId].count;
    }
    setTotalProducts(sum);
  }, [bookQuantities]);

  // const { cart_cartBuy: cart } = carrito;
  return (
    <div className="div-cart">
      <Navbar />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            {carrito && carrito.books ? (
              carrito.books.map((book, index) => (
                <Card
                  key={index}
                  style={{
                    margin: "10px",
                    boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.5)",
                    fontFamily: "'Hanken Grotesk', sans-serif",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <CardMedia
                        component="img"
                        alt={book.title}
                        height="140"
                        image={book.image}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CardContent>
                        <h1
                          className="title is-4"
                          style={{
                            fontFamily: "'Hanken Grotesk', sans-serif",
                          }}
                        >
                          {book.title || "No Title"}
                        </h1>
                        <Typography>
                          <span
                            className="title is-6"
                            style={{
                              fontFamily: "'Hanken Grotesk', sans-serif",
                              fontWeight: "bold",
                              fontSize: "17px",
                            }}
                          >
                            Price:
                          </span>{" "}
                          {`$${
                            (bookQuantities[book.bookId]?.count || 1) *
                            book.price
                          }`}
                        </Typography>
                        <CardButtons book={book} />
                      </CardContent>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        type="number"
                        value={
                          (bookQuantities[book.bookId] &&
                            bookQuantities[book.bookId].count) ||
                          carrito.cart.cart_cartBuy.filter(
                            (e) => e.bookId === book.bookId
                          )[0].count
                        }
                        onChange={(e) =>
                          handleQuantityChange(
                            book.bookId,
                            parseInt(e.target.value)
                          )
                        }
                        variant="outlined"
                        size="small"
                      />

                      <button
                        onClick={() =>
                          setCount(
                            bookQuantities[book.bookId].count,
                            book.bookId
                          )
                        }
                      >
                        OK
                      </button>
                    </Grid>
                  </Grid>
                </Card>
              ))
            ) : (
              <Loading />
            )}
          </Grid>

          <Grid item xs={4}>
            <Card
              style={{
                margin: "10px",
                boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.5)",
                fontFamily: "'Hanken Grotesk', sans-serif",
              }}
            >
              <CardContent>
                <h1
                  className="title is-4"
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                  }}
                >
                  Resumen de Compra
                </h1>
                <Typography
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                  }}
                >
                  Productos ({carrito.books.length})
                  <br />
                  <span
                    className="title is-6"
                    style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                    }}
                  >
                    Total Price:
                  </span>{" "}
                  ${totalPrice}
                </Typography>
                <br />
                <Link to="/checkout">
                  <Button
                    variant="contained"
                    color="success"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
                    startIcon={<Paid />}
                  >
                    Ir a Pagar
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
