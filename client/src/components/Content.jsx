import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from "js-cookie";

function Content() {
  const { toggleAuth } = useContext(AuthContext);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      axios
        .get("/me") // ver la ruta del back
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
