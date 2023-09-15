import axios from "axios";
import { useState, createContext } from "react";

// const initialState = {};
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [state, setState] = useState({
    allUsers: [],
  });

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/admin/users`);

      console.log(res.data);
      setState((s) => ({ ...s, allUsers: res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const switchAdmin = async (userId) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/admin/users/${userId}/admin`
      );

      // console.log(res.data);
      setState((s) => ({ ...s, allUsers: res.data }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminContext.Provider value={{ ...state, getAllUsers, switchAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
