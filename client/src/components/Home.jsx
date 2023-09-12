import React, { useContext, useEffect } from "react";
import Navbar from "../commons/Navbar";
import { AllProducts } from "./AllProducts";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../commons/Cards/Loading";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { search, SearchBook } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   let book = SearchBook();
  //   console.log(book);
  //   if (book.length > 0) {
  //     navigate("/user/products/" + book[0].bookId);
  //   }
  // }, [search]);
  return (
    <div className="home">
      <Navbar />
      <AllProducts />
    </div>
  );
}
