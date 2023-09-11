import React, { useContext } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import { InfoOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CartBooksContext } from "../../contexts/CartBookContext";
// import { items } from "../../mocks/books.json";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cards({ book }) {
  const [expanded, setExpanded] = React.useState(false);
  const { addToCart } = useContext(CartBooksContext);
  const { isOnCart } = useContext(AuthContext);

  const handleAddToCart = () => {
    // funcion para agregar a carrito con book.id
    addToCart(book.id);
  };
  const thumbnail = book.volumeInfo.imageLinks
    ? book.volumeInfo.imageLinks.smallThumbnail
    : "https://cdn-icons-png.flaticon.com/512/2421/2421033.png";
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="194"
        src={thumbnail}
        alt="Paella dish"
        sx={{ height: "150px" }}
      />
      <CardContent>{book.volumeInfo.title.slice(0, 15)}...</CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleAddToCart}>
          {isOnCart(book.id) ? (
            <RemoveShoppingCartIcon />
          ) : (
            <ShoppingCartIcon />
          )}
        </IconButton>
        <Link
          to={`/user/products/${book.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <InfoOutlined />
        </Link>
      </CardActions>
    </Card>
  );
}
