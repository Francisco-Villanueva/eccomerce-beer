import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function AddBook() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const { createBook } = useContext(AuthContext);
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

    const newBook = {
      title: title,
      description: description,
      author: author,
      genre: genre,
      year: year,
    };
    createBook(newBook, navigate);
    setTitle("");
    setAuthor("");
    setGenre("");
    setYear("");
    // axios
    //   .post("http://localhost:4000/admin/books/createBook", {
    //     title: title,
    //     description: description,
    //     author: author,
    //     genre: genre,
    //     year: year,
    //   })
    //   .then((newBook) => {
    //     message.success("Libro Creado!");
    //     navigate("/home");
    //     getAllBooks();
    // setTitle("");
    // setAuthor("");
    // setGenre("");
    // setYear("");
    //   })
    //   .catch((err) => console.log(err));

  };

  return (
    <div className="container">
      <div className="form" style={{backgroundColor: "#fff", color: "black"}}>
        <Typography variant="h4" className="form-title">
          Add New Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                value={title}
                onChange={handleTitleChange}
                label="Title"
                autoComplete="title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                margin="normal"
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Autor"
                margin="normal"
                value={author}
                onChange={handleAuthorChange}
                autoComplete="Autor"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Género"
                margin="normal"
                value={genre}
                onChange={handleGenreChange}
                autoComplete="Genero"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Año de Publicación"
                margin="normal"
                value={year}
                onChange={handleYearChange}
                autoComplete="Año de publicacion"
                autoFocus
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Add Book
          </Button>
        </form>
      </div>
    </div>
  );
}
