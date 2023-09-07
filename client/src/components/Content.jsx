import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
// import Cookies from "js-cookie";

function Content() {
  const { toggleAuth } = useContext(AuthContext);
  // const token = Cookies.get("token");
  localStorage.setItem("token", "vic");
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(token);
    if (token) {
      axios
        .get("http://localhost:4000/user/me")
        .then((response) => {
          const user = response.data;
          toggleAuth(user);
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
        });
    }
  }, [token]);

  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Content;
