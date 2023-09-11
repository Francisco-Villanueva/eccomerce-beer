import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CartBooksContext } from "../contexts/CartBookContext";

export default function Search() {
  const { books } = useContext(CartBooksContext);
  const nameBooks = books.map((book) => {
    return book.volumeInfo.title;
  });
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={nameBooks}
      sx={{ width: 300, background: "white" }}
      renderInput={(params) => <TextField {...params} label="Search Books" />}
    />
  );
}
