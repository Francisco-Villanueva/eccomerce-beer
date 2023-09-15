import React, { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Avatar, Box } from "@mui/material";
import { BookSharp, ShoppingCart, HistorySharp } from "@mui/icons-material";
import Search from "../components/Search";
import devBookLogo from "../assets/imgs/devbooks-circulo.png";
// import devBookLogo from "../assets/images/image.png";
function Navbar() {
  const { isAuthenticated, user, carrito, logoutUser } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const loginUser = () => {
    navigate("/login");
  };

  return (
    <nav
      className="navbar-style navbar has-background-black-ter "
      style={{
        display: "flex",
        alignItems: "center",
        maxHeight: "60px",
        position: "sticky",
        width: "100%",
        zIndex: 100,
        top: 0,
        background: "linear-gradient(to bottom, #242424, #535353)",
      }}
    >
      <div className="buttons">
        <Link to="/home">
          <img
            className="logoDevBooks is-flex navbar-item navbar-end"
            style={{ height: "75px", width: "75px" }}
            src={devBookLogo}
            alt="devbooks"
          />
        </Link>
      </div>
      <div className="navbar-item navbar-end">
        {isAuthenticated ? (
          <Link to="/home">
            <button
              className="button is-ghost has-text-white"
              style={{ maxHeight: "35px", maxWidth: "53px" }}
            >
              <BookSharp />
            </button>
          </Link>
        ) : (
          <div />
        )}

        {isAuthenticated ? (
          <Link to="/cart">
            <button
              className="button is-ghost has-text-white"
              style={{
                textDecoration: "none",
                maxHeight: "35px",
                maxWidth: "70px",
              }}
            >
              {carrito.books?.length} | <ShoppingCart />
            </button>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <div>
        <Search />
      </div>
      {user && user.isAdmin ? (
        <>
          <div>
            <Link to="/admin/addBook">
              <button
                className="button is-ghost has-text-white"
                style={{
                  textDecoration: "none",
                  margin: "5px",
                  maxHeight: "35px",
                  maxWidth: "70px",
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  marginLeft: "1vw",
                }}
              >
                Add Book
              </button>
            </Link>
          </div>
          <div>
            <Link to="/admin/addCategory">
              <button
                className="button is-ghost has-text-white"
                style={{
                  textDecoration: "none",
                  margin: "5px",
                  maxHeight: "35px",
                  maxWidth: "110px",
                  fontFamily: "'Hanken Grotesk', sans-serif",
                }}
              >
                Add Category
              </button>
            </Link>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="navbar-item navbar-end">
        <div className="navbar-item">
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link to={"/history"}>
              <HistorySharp style={{ color: "#fff", marginTop: "5px" }} />
            </Link>
            {isAuthenticated && (
              <Avatar
                style={{
                  maxHeight: "35px",
                  maxWidth: "35px",
                  backgroundColor: "black",
                  margin: "1px",
                  paddingTop: "3px",
                }}
              >
                {user.username.slice(0, 1).toUpperCase()}{" "}
              </Avatar>
            )}
            <button
              className="button is-light is-hovered"
              style={{
                margin: 0,
                fontFamily: "'Hanken Grotesk', sans-serif",
                transition: "background-color 0.3s",
                maxHeight: "30px",
                maxWidth: "70px",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#b0abab")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "")}
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
