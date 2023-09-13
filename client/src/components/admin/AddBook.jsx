import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { message } from "antd";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleAuthorChange = (e) => {
    const value = e.target.value;
    setAuthor(value);
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    setGenre(value);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYear(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/books/createBook", {
        title: title,
        description: description,
        author: author,
        genre: genre,
        year: year,
      })
      .then((newBook) => {
        message.success("Libro Creado!");
        setTitle("");
        setAuthor("");
        setGenre("");
        setYear("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <TextField
          label="Autor"
          variant="outlined"
          fullWidth
          margin="normal"
          value={author}
          onChange={handleAuthorChange}
          required
        />
        <TextField
          label="Género"
          variant="outlined"
          fullWidth
          margin="normal"
          value={genre}
          onChange={handleGenreChange}
          required
        />
        <TextField
          label="Año de Publicación"
          variant="outlined"
          fullWidth
          margin="normal"
          value={year}
          onChange={handleYearChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Agregar Libro
        </Button>
      </form>
    </div>
  );
}
