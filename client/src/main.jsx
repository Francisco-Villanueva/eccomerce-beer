import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider, { AuthContext } from "./contexts/AuthContext";
import { CartBooksProvider } from "./contexts/CartBookContext.jsx";
import CheckoutContextProvider from "./contexts/CheckoutContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <CheckoutContextProvider> */}
    <CartBooksProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </CartBooksProvider>
    {/* </CheckoutContextProvider> */}
  </BrowserRouter>
);
