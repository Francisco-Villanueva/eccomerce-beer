import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const { toggleAuth } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailData(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordData(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/user/login", {
        // ver la ruta del back
        email: emailData,
        password: passwordData,
      })
      // .then((res) => res.data)
      .then((user) => {
        toggleAuth(user);
        //navigate(`/login/${user.name}`);
        console.log("Login exitoso:", user);
      })
      .catch((error) => {
        console.error("Error en el login:", error);
      });
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="input"
          type="email"
          placeholder="email"
          value={emailData.email}
          onChange={handleEmailChange}
        ></input>

        <label>Password</label>
        <input
          className="input"
          type="password"
          placeholder="password"
          value={passwordData.password}
          onChange={handlePasswordChange}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
