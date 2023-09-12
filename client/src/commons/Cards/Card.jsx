import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";

import { AuthContext } from "../../contexts/AuthContext";
import CardButtons from "../CardButtons";
import { Box } from "@mui/material";
// import { items } from "../../mocks/books.json";

export default function Cards({ book }) {
  const [expanded, setExpanded] = React.useState(false);
  // const { addToCart } = useContext(CartBooksContext);
  const { isOnCart, addToCart, removeFromCart, user } = useContext(AuthContext);

  const handleAddToCart = () => {
    // funcion para agregar a carrito con book.id

    if (isOnCart(book.id)) {
      removeFromCart(book.id);
    } else {
      addToCart(book.id);
    }
  };

  return (
    <Card className="card"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        src={book.image}
        alt="Paella dish"
        sx={{ objectFit: "contain", height: "280px", borderRadius: "5px"}}
      />
      <CardContent
      sx={{ objectFit: "contain", padding: "10px", paddingBottom: "0px",  fontFamily: "'Hanken Grotesk', sans-serif",  fontSize: "14px"}}
      >{book.title.slice(0, 50)}...</CardContent>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardButtons
          book={book}
          isOnCart={isOnCart}
          handleAddToCart={handleAddToCart}
        />
      </Box>
    </Card>
  );
}
