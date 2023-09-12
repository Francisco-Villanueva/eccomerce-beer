import React, { useContext } from "react";
import Navbar from "../commons/Navbar";
import { AllProducts } from "./AllProducts";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../commons/Cards/Loading";

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <AllProducts />
    </div>
  );
}
