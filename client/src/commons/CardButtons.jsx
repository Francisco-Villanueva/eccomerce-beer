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
    // funcion para agregar a carrito con book.id

    if (isOnCart(book.id)) {
      removeFromCart(book.id);
    } else {
      addToCart(book.id);
    }
  };
  return (
    <div>
      <IconButton aria-label="add to favorites" onClick={handleAddToCart}>
        {isOnCart(book.id) ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />}
      </IconButton>
      <Link
        to={`/user/products/${book.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <InfoOutlined />
      </Link>
    </div>
  );
}
