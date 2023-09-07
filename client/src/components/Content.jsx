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
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log(userId);
    if (userId) {
      axios
        .get(`http://localhost:4000/admin/users/${userId}`)
        .then((response) => {
          const user = response;
          console.log(response);
          // toggleAuth(user);
        })
        .catch((error) => {
          console.error("Error al verificar el token:", error);
        });
    }
  }, [userId]);

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
