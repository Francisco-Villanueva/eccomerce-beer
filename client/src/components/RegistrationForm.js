import React, { useState } from "react";
import axios from "axios";

function RegistrationForm() {
  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameData(value);
  };

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
      .post("/register", {
        name: nameData,
        email: emailData,
        password: passwordData,
      })
      // .then((res) => res.data)
      .then((user) => {
        console.log("Registro exitoso:", user);
        setIsRegistered(true);
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        setIsRegistered(false);
      });
  };
  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          className="input"
          type="text"
          placeholder="name"
          value={nameData.name}
          onChange={handleNameChange}
        />
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
        <button type="submit" className="button is-link my-5">
          Submit
        </button>
      </form>
      {isRegistered ? (
        <p className="has-text-success">
          Registration successful! Go to Login!
        </p>
      ) : (
        <p className="has-text-danger">Registration failed!</p>
      )}
    </div>
  );
}

export default RegistrationForm;
