import React, { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const loginUser = () => {
    // navigate(`/login`);
  };

  const logoutUser = () => {
    // axios
    //   .post("/logout")
    //   .then(() => {
    //     toggleAuth(null);
    //     // navigate("/");
    //   })
    //   .catch((error) => {
    //     console.error("Error en el logout:", error);
    //   });
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
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>
        <div>
          <p>
            {isAuthenticated
              ? `Welcome ${user.name}!!!`
              : "You are logged out!"}
          </p>
          <button
            onClick={() => (isAuthenticated ? logoutUser() : loginUser())}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
        {!isAuthenticated && (
          <div>
            <p>Not a User?</p>
            <Link to="/register">
              <button>REGISTER</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

{
  /* <nav>
      <div>
        <p>
          {isAuthenticated ? `Welcome ${user.name}!!!` : "You are logged out!"}
        </p>
        <button onClick={() => (isAuthenticated ? logoutUser() : loginUser())}>
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
      {!isAuthenticated && (
        <div>
          <p>Not a User?</p>
          <Link to="/register">
            <button>REGISTER</button>
          </Link>
        </div>
      )}
    </nav> */
}
