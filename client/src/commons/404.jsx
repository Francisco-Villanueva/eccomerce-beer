import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Card } from "@mui/material";

const Page404 = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h2"
          style={{ marginBottom: "16px", color: "black" }}
        >
          Page not found
        </Typography>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Back Home
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default Page404;
