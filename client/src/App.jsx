import React from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
<<<<<<< HEAD
import Navbar from "./components/Navbar";
import AuthContextProvider from "./contexts/AuthContext";
import Content from "./components/Content";

const App = () => (
  <AuthContextProvider>
    <Navbar />
    <Content />
  </AuthContextProvider>
);
=======
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
>>>>>>> develop

export default App;
