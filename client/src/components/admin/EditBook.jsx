import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const { getAllBooks } = useContext(AuthContext);
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
      .put(`http://localhost:4000/admin/books/${id}`, {
        title: title,
        description: description,
        author: author,
        genre: genre,
        year: year,
      })
      .then((editBook) => {
        console.log(editBook.data);
        message.success("Libro Editado!");
        setTitle("");
        setAuthor("");
        setGenre("");
        setYear("");
        navigate("/home");
        getAllBooks();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="form">
        <Typography variant="h4" className="form-title">
          Edit Book
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
            submit
          </Button>
        </form>
      </div>
    </div>
  );
}
