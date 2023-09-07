import React, { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const { isAuthenticated, toggleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const loginUser = () => {
    navigate("/login");
  };

  const logoutUser = () => {
    axios
      .post("http://localhost:4000/user/logout")
      .then(() => {
        toggleAuth(null);
        // navigate("/");
      })
      .catch((error) => {
        console.error("Error en el logout:", error);
      });
  };

  useEffect(() => {
    console.log("isAuthenticated: " + isAuthenticated);
  }, [isAuthenticated]);

  return (
    <nav className="navbar has-background-black-ter mb-4">
      <div className="buttons">
        <Link to="/">
          <h1
            className="navbar-item"
            style={{ fontWeight: "bold", color: "white" }}
          >
            HOME
          </h1>
        </Link>
      </div>
      <div className="navbar-item navbar-end">
        <Link to="/">
          <button className="button is-ghost has-text-white">BOOKS</button>
        </Link>
        {isAuthenticated ? (
          <Link to="/favorites">
            <button className="button is-ghost has-text-white">CART</button>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <div className="navbar-item navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <button
              className="button is-light"
              onClick={() => (isAuthenticated ? logoutUser() : loginUser())}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        </div>
        {!isAuthenticated && (
          <div>
            <Link to="/register">
              <button className="button is-light">REGISTER</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
