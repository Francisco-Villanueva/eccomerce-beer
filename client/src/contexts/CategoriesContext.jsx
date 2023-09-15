import React, { createContext, useContext, useState, useEffect } from "react";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categoriesList, setCategoriesList] = useState(
    JSON.parse(localStorage.getItem("categories")) || [
      "Computers",
      "Algorithms",
      "Theory",
      "Engineering",
      "Software",
      "Business & Economics",
      "Collectibles",
      "Robotics",
      "Databases",
      "Education",
      "Games",
      "Accouting",
    ]
  );

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categoriesList));
  }, [categoriesList]);

  return (
    <CategoriesContext.Provider value={{ categoriesList, setCategoriesList }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};