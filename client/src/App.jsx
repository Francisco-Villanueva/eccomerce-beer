import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom"
import { AllProducts } from "./components/AllProducts";
import { OneProduct } from "./components/OneProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element= {<AllProducts/>} />
        <Route path="/user/products/:id" element= {<OneProduct/>} />
      </Routes>
    </>
  );
}

export default App;


