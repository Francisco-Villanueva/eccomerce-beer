import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Search() {
  const { books, setSearch, SearchBook, search } = useContext(AuthContext);
  const nameBooks = books?.map((book) => {
    return book.title;
  });

  const handleBookSelect = (selectedBookTitle) => {
    console.log("Libro seleccionado:", selectedBookTitle);
    setSearch(selectedBookTitle);
    SearchBook();
  };

  // console.log({ search });

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    SearchBook();
  };
  // console.log({ books });
  return (
    <form onSubmit={handleBookSelect}>
      <input
        className="search"
        type="text"
        placeholder="Search Book"
        onChange={handleInputChange}
        value={search}
      />
    </form>
  );
}
