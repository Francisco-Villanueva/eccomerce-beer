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

function App() {
  const { setUser, setCarrito, getAllBooks, userId } = useContext(AuthContext);

  // const userId = localStorage.getItem("userId");

  useEffect(() => {
    getAllBooks();
    if (userId) {
      axios
        .get(`http://localhost:4000/admin/users/${userId}`)
        .then((response) => {
          const user = response.data;
          setUser(user);
          setCarrito(user.user_cartBuy);
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
        <Route path="/user/products/:id" element={<OneProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
