import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AuthContextProvider from "./contexts/AuthContext";

const App = () => (
  <AuthContextProvider>
    <Navbar />
  </AuthContextProvider>
);

export default App;
