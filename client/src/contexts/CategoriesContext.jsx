import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categoriesList, setCategoriesList] = useState([]);

  const getCategories = async () => {
    try {
      const cat = await axios.get(`http://localhost:4000/category`);

      const arrAux = cat.data.map((m) => m.category);
      console.log(arrAux);
      setCategoriesList(arrAux);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (category) => {
    try {
      const cat = await axios.post(`http://localhost:4000/admin/category`, {
        category,
      });

      setCategoriesList((s) => [...s, cat.data.newCategory[0].category]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (category) => {
    try {
      const cat = await axios.delete(
        `http://localhost:4000/admin/category/${category}`
      );

      getCategories();

      message.info(`${category} deleted from categories!`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CategoriesContext.Provider
      value={{
        categoriesList,
        setCategoriesList,
        getCategories,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};
