import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AuthContextProvider from "./contexts/AuthContext";
import Content from "./components/Content";

const App = () => (
  <AuthContextProvider>
    <Navbar />
    <Content />
  </AuthContextProvider>
);

export default App;
