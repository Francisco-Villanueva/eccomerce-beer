import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AuthContext } from "../contexts/AuthContext";

export default function Search() {
  const { books, Search, setSearch } = useContext(AuthContext);
  const nameBooks = books?.map((book) => {
    return book.title;
  });

  const handleBookSelect = (selectedBookTitle) => {
    console.log("Libro seleccionado:", selectedBookTitle);
    setSearch(selectedBookTitle);
  };
  const result = Search();
  console.log(result);

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
