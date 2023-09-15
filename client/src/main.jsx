import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthContextProvider from "./contexts/AuthContext";
import { CartBooksProvider } from "./contexts/CartBookContext.jsx";
import { CategoriesProvider } from "./contexts/CategoriesContext.jsx";
import { CheckoutContextProvider } from "./contexts/CheckoutContext";
import { AdminProvider } from "./contexts/AdminContext.jsx";
// import {AdminProvider} frpm "./"
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminProvider>
      <CategoriesProvider>
        <CheckoutContextProvider>
          <CartBooksProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </CartBooksProvider>
        </CheckoutContextProvider>
      </CategoriesProvider>
    </AdminProvider>
  </BrowserRouter>
);
