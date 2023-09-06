import React, { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
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

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    console.log("isAuthenticated: " + isAuthenticated);
  }, [isAuthenticated]);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">Home</a>
          <a className="navbar-item">Documentation</a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item"></a>
              <a className="navbar-item"></a>
              <a className="navbar-item"></a>
              <a className="navbar-item"></a>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isAuthenticated ? (
                <a class="button is-primary">
                  <div>
                    <Link to="/register">
                      <strong>Sign up</strong>
                    </Link>
                  </div>
                </a>
              ) : null}
              <a
                className="button is-light"
                onClick={() => (isAuthenticated ? logoutUser() : loginUser())}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
