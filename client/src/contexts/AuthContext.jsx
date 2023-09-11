import { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const initialState = {
  user: null,
  isAuthenticated: false,
  toggleAuth: () => null,
};

export const AuthContext = createContext(initialState);
const userId = localStorage.getItem("userId");

const AuthContextProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState({
    user: initialState.user,
    isAuthenticated: initialState.isAuthenticated,
  });

  const [carrito, setCarrito] = useState([]);

  const toggleAuth = (user) =>
    setIsLoggedIn({
      user: user,
      isAuthenticated: user ? true : false,
    });

  const loginUser = (emailData, passwordData, navigate) => {
    axios
      .post("http://localhost:4000/user/login", {
        email: emailData,
        password: passwordData,
      })
      .then((res) => res.data)
      .then((user) => {
        localStorage.setItem("userId", user.id);
        toggleAuth(user);
        message.success("Login succesfully");
        navigate("/home");
        console.log("Login exitoso:", user);
      })
      .catch((error) => {
        console.error("Error en el login:", error);
      });
  };

  const registerUser = (name, email, password, navigate) => {
    axios
      .post("http://localhost:4000/user/register", {
        name,
        email,
        password,
      })
      .then((res) => res.data)
      .then((user) => {
        console.log("Registro exitoso:", user);
        message.success("Registrado!");
        // setIsRegistered(true);
        navigate("/login");
      })
      .catch((error) => {
        message.error(error.response.data);
        console.error("Error en el registro:", { error });
        // setIsRegistered(false);
      });
  };

  const setUser = (user) => {
    setIsLoggedIn({
      user: user,
      isAuthenticated: true,
    });
    setCarrito(user.user_cartBuy);
  };

  const addToCart = (id) => {
    axios
      .post(`http://localhost:4000/cart/add/${id}/${userId}`)
      .then((user) => {
        message.success("Agregado a carrito", 1);
        const userId = user.data.id;
        axios
          .get(`http://localhost:4000/admin/users/${userId}`)
          .then((user) => {
            setUser(user.data);
            // console.log(user.data); //ACA ESTA ACTUALIZADO EL BOOKID
          });
      })
      .catch((err) => console.log(err));
  };

  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:4000/cart/remove/${id}/${userId}`)
      .then((user) => {
        message.info("Eliminado del carrito");
        const userId = user.data.id;
        axios
          .get(`http://localhost:4000/admin/users/${userId}`)
          .then((user) => {
            setUser(user.data);
            // console.log(user.data); //ACA ESTA ACTUALIZADO EL BOOKID
          });
      });
  };
  const isOnCart = (bookId) => {
    const arrayOfBooksId = carrito.map((m) => m.bookId);

    return arrayOfBooksId.includes(bookId); //booleano
  };
  return (
    <AuthContext.Provider
      value={{
        ...isLoggedIn,
        toggleAuth,
        loginUser,
        setUser,
        carrito,
        isOnCart,
        addToCart,
        registerUser,
        removeFromCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
