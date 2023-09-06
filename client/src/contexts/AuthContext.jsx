import { useState, createContext } from "react";

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

  return (
    <AuthContext.Provider value={{ ...isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
