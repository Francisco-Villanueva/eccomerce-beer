import axios from "axios";
import { useState, createContext } from "react";

// const initialState = {};
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, setState] = useState({
    allUsers: [],
  });

  const getAllUsers = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:4000/admin/users`);

      setState((s) => ({ ...s, allUsers: res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminContext.Provider value={{ ...state, getAllUsers }}>
      {children}
    </AdminContext.Provider>
  );
};
