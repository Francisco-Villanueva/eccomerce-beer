import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ArrowBack } from "@mui/icons-material";

import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function AddBook() {
  const navigate = useNavigate();
  const { createBook } = useContext(AuthContext);

  const [data, setData] = useState({
    title: "",
    description: "",
    author: "",
    categories: "",
    date: "",
    price: "",
    img: "",
  });

  const handleInputChange = (e) => {
    setData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBook(data, navigate);
    setData({
      title: "",
      description: "",
      author: "",
      categories: "",
      date: "",
      price: "",
      img: "",
    });
  };

  const nav = useNavigate();
  return (
    <div className="container">
      <button
        onClick={() => {
          nav("/home");
        }}
        style={{
          background: "#fff",
          border: "none",
          position: "absolute",
          top: 0,
          lerft: 0,
          margin: "10px",
        }}
      >
        <ArrowBack />
      </button>
      <div className="form" style={{ backgroundColor: "#fff", color: "black" }}>
        <Typography variant="h4" className="form-title">
          Add New Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                value={data.title}
                onChange={handleInputChange}
                label="Title"
                autoComplete="title"
                name="title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                margin="normal"
                name="description"
                value={data.description}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Autor"
                margin="normal"
                value={data.author}
                onChange={handleInputChange}
                autoComplete="Autor"
                name="author"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Categories"
                margin="normal"
                value={data.categories}
                onChange={handleInputChange}
                autoComplete="Categories"
                name="categories"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // label="Date"
                margin="normal"
                value={data.date}
                onChange={handleInputChange}
                autoComplete="Date"
                name="date"
                type="date"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                margin="normal"
                value={data.price}
                onChange={handleInputChange}
                autoComplete="Price"
                name="price"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Img"
                name="img"
                margin="normal"
                value={data.img}
                onChange={handleInputChange}
                autoComplete="Img"
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
