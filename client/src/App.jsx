import React, { useContext, useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { Routes, Route } from "react-router-dom";
import { OneProduct } from "./components/OneProduct";
import Login from "./components/Login";
import axios from "axios";
import { Cart } from "./components/Cart";
import { CartBooksContext, useCartBooks } from "./contexts/CartBookContext";
import Home from "./components/Home";
import SignUp from "./components/RegistrationForm";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [count, setCount] = useState(0);
  const { setUser } = useContext(AuthContext);
  const { setCarrito, cartBooks, carrito } = useCartBooks();

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

  console.log({ carrito_length: cartBooks?.length });

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/books" element={<AllProducts />} /> */}
        <Route path="/user/products/:id" element={<OneProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
