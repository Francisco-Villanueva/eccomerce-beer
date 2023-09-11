import React, { useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, Box } from "@mui/material";
import { BookSharp, ShoppingCart } from "@mui/icons-material";
// import devBookLogo from "../assets/images/image.png";
function Navbar() {
  const { isAuthenticated, user, carrito, logoutUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const loginUser = () => {
    navigate("/login");
  };

  console.log({ carrito });
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
              {carrito.length} | <ShoppingCart />
            </button>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <div className="navbar-item navbar-end">
        <div className="navbar-item">
          <Box
            className="buttons"
            sx={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {isAuthenticated && <Avatar>{user.username.slice(0, 1)} </Avatar>}
            <button
              className="button is-light"
              style={{ margin: 0 }}
              onClick={() =>
                isAuthenticated ? logoutUser(navigate) : loginUser()
              }
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
