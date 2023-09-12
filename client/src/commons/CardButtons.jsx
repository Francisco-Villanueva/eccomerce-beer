import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { InfoOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function CardButtons({ book }) {
  const { isOnCart, addToCart, removeFromCart } = useContext(AuthContext);
  const handleAddToCart = () => {
    // funcion para agregar a carrito con book.bookId

    if (isOnCart(book.bookId)) {
      removeFromCart(book.bookId);
    } else {
      addToCart(book.bookId);
    }
  };
  return (
    <div className="is-flex is-justify-content-center is-align-items-baseline">
      <IconButton aria-label="add to favorites" onClick={handleAddToCart}>
        {isOnCart(book.bookId) ? (
          <RemoveShoppingCartIcon />
        ) : (
          <ShoppingCartIcon />
        )}
      </IconButton>
      <Link to={`/user/products/${book.bookId}`} style={{ textDecoration: "none", color: "inherit", margin: 0 }}>
        <InfoOutlined />
      </Link>
    </div>
  );
}
