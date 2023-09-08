import React, { useContext, useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import Content from "./components/Content";
import { Routes, Route } from "react-router-dom";
import { AllProducts } from "./components/AllProducts";
import { OneProduct } from "./components/OneProduct";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";
import axios from "axios";
import { Cart } from "./components/Cart";
import { CartBooksContext, useCartBooks } from "./contexts/CartBookContext";

function App() {
  const [count, setCount] = useState(0);
  const { setUser } = useContext(AuthContext);
  const { setCarrito, cartBooks } = useCartBooks();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // console.log(userId);
    if (userId) {
      axios
        .get(`http://localhost:4000/admin/users/${userId}`)
        .then((response) => {
          const user = response.data;
          setUser(user);
          setCarrito(user.user_cartBuy);
          // console.log(response);
          // toggleAuth(user);
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
        });
    }
  }, [userId]);

  console.log(cartBooks[0]);

  return (
    <>
      <Navbar />
      <Content />
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<AllProducts />} />
        <Route path="/books" element={<AllProducts />} />

        <Route path="/user/products/:id" element={<OneProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
