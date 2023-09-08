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
      .post("http://localhost:4000/user/register", {
        name: nameData,
        email: emailData,
        password: passwordData,
      })
      .then((res) => res.data)
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
    <div className="layout m-5">
      <h3 className="title is-3">Register</h3>
      {isRegistered ? (
        <p className="has-text-success">
          Registration successful! Go to Login!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label className="label my-3">Name</label>
          <input
            className="input"
            type="text"
            placeholder="name"
            value={nameData.name}
            onChange={handleNameChange}
            required
          />

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
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
