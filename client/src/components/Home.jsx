import React from "react";
import Navbar from "../commons/Navbar";
import { AllProducts } from "./AllProducts";

export default function Home() {
  return (
    <div>
      <Navbar />
      <AllProducts />
    </div>
  );
}
