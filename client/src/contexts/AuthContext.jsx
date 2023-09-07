import { useState, createContext } from "react";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  toggleAuth: () => null,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState({
    user: initialState.user,
    isAuthenticated: initialState.isAuthenticated,
  });

  const toggleAuth = (user) =>
    setIsLoggedIn({
      user: user,
      isAuthenticated: user ? true : false,
    });

  const loginUser = (emailData, passwordData) => {
    axios
      .post("http://localhost:4000/user/login", {
        email: emailData,
        password: passwordData,
      })
      .then((res) => res.data)
      .then((user) => {
        localStorage.setItem("userId", user.id);
        toggleAuth(user);
        // console.log(user);
        // navigate(`/login/${user.username}`);
        console.log("Login exitoso:", user);
      })
      .catch((error) => {
        console.error("Error en el login:", error);
      });
  };

  const setUser = (user) => {
    setIsLoggedIn((state) => ({ ...state, user }));
  };

  return (
    <AuthContext.Provider
      value={{ ...isLoggedIn, toggleAuth, loginUser, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
