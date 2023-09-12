import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AuthContext } from "../contexts/AuthContext";

export default function Search() {
  const { books, setSearch } = useContext(AuthContext);
  const nameBooks = books?.map((book) => {
    return book.title;
  });

  const handleBookSelect = (selectedBookTitle) => {
    console.log("Libro seleccionado:", selectedBookTitle);
    setSearch(selectedBookTitle);
  };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={nameBooks}
      onChange={(event, selectedOption) => {
        if (selectedOption) {
          handleBookSelect(selectedOption);
        }
      }}
      sx={{ width: "200px", height: "40px", background: "white", textDecoration: "none"}}
      renderInput={(params) => <TextField {...params} label="Search Books" />}
    />
  );
}
