import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const { loginUser } = useContext(AuthContext);

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
    loginUser(emailData, passwordData);
  };

  return (
    <div className="layout m-5">
      <h3 className="title is-3">Login</h3>
      <form onSubmit={handleSubmit}>
        <label className="label my-3">Email</label>
        <input
          className="input"
          type="email"
          placeholder="email"
          value={emailData.email}
          onChange={handleEmailChange}
          required
        ></input>

        <label className="label my-3">Password</label>
        <input
          className="input"
          type="password"
          placeholder="password"
          value={passwordData.password}
          onChange={handlePasswordChange}
          required
        ></input>
        <button type="submit" className="button is-link my-5">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
