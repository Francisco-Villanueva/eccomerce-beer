import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom"
import { AllProducts } from "./components/AllProducts";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Beer</h1>
      <h2>Nico</h2>
      <Routes>
        <Route path="/" element= {<AllProducts/>} />
      </Routes>
    </>
  );
}

export default App;


