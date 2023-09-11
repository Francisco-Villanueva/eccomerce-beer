import React, { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, Box } from "@mui/material";
import { BookSharp, ShoppingCart } from "@mui/icons-material";
import Search from "../components/Search";
// import devBookLogo from "../assets/images/image.png";
function Navbar() {
  const { isAuthenticated, toggleAuth, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const loginUser = () => {
    navigate("/login");
  };

  const logoutUser = () => {
    axios
      .post("http://localhost:4000/user/logout")
      .then(() => {
        toggleAuth(null);
        navigate("/login");
        localStorage.clear();
      })
      .catch((error) => {
        console.error("Error en el logout:", error);
      });
  };

  useEffect(() => {
    console.log("isAuthenticated: " + isAuthenticated);
  }, [isAuthenticated]);

  return (
    <nav
      className="navbar has-background-black-ter "
      style={{ display: "flex", alignItems: "center" }}
    >
      <div className="buttons">
        <Link to="/home">
          {/* <img src={devBookLogo} alt="devbooks" style={{ width: "100px" }} /> */}
          <h1>LOGO</h1>
        </Link>
      </div>
      <div className="navbar-item navbar-end">
        {isAuthenticated ? (
          <Link to="/home">
            <button className="button is-ghost has-text-white">
              <BookSharp />
            </button>
          </Link>
        ) : (
          <div />
        )}

        {isAuthenticated ? (
          <Link to="/cart">
            <button className="button is-ghost has-text-white">
              <ShoppingCart />
            </button>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <div className="navbar-item navbar-end">
        <div>
          <Search />
        </div>
        <div className="navbar-item">
          <Box
            className="buttons"
            sx={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {isAuthenticated && <Avatar>{user.username.slice(0, 1)} </Avatar>}
            <button
              className="button is-light"
              style={{ margin: 0 }}
              onClick={() => (isAuthenticated ? logoutUser() : loginUser())}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </Box>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
