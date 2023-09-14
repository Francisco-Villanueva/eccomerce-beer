import React, { useContext, useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Routes, Route } from "react-router-dom";
import { OneProduct } from "./components/OneProduct";
import Login from "./components/Login";
import axios from "axios";
import { Cart } from "./components/Cart";
import Home from "./components/Home";
import SignUp from "./components/RegistrationForm";
import { AuthContext } from "./contexts/AuthContext";
import Welcome from "./components/Welcome";
import AddBook from "./components/admin/AddBook";
import EditBook from "./components/admin/EditBook";
import { Checkout } from "./components/Checkout";
import HistoryCart from "./components/HistoryCart";

function App() {
  const { setUser, setCarrito, getAllBooks, userId, setHistory } =
    useContext(AuthContext);

  useEffect(() => {
    getAllBooks();
    if (userId) {
      axios
        .get(`http://localhost:4000/admin/users/${userId}`)
        .then((response) => {
          const user = response.data;
          setUser(user);
          setCarrito();
          setHistory(userId);
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
        });
    }
  }, [userId]);

  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/user/products/:id" element={<OneProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/addBook" element={<AddBook />} />
        <Route path="/admin/books/:id" element={<EditBook />} />
        <Route path="/history" element={<HistoryCart />} />
      </Routes>
    </>
  );
}

export default App;
