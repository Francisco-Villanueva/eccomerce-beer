import { useState, createContext } from "react";
import axios from "axios";
import { message } from "antd";
const initialState = {
  user: null,
  isAuthenticated: false,
  toggleAuth: () => null,
};

export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState({
    books: [],
    userId: localStorage.getItem("userId"),
    user: {},
    isAuthenticated: false,
    carrito: { cart: [], books: [] },
    search: "",
    searchedBooks: [],
  });

  const loginUser = (emailData, passwordData, navigate) => {
    axios
      .post("http://localhost:4000/user/login", {
        email: emailData,
        password: passwordData,
      })
      .then((res) => res.data)
      .then((user) => {
        console.log("IDUSER", user);
        axios
          .get(`http://localhost:4000/admin/users/${user.id}`)
          .then((res) => {
            const user = res.data;
            localStorage.setItem("userId", user.id);
            setUser(user);
            getAllBooks();
            // setState((s) => ({
            //   ...s,
            //   user: user,
            //   userId: localStorage.setItem("userId", user.id),
            //   isAuthenticated: true,
            // }));
            message.success("Login succesfully", 1);
            setTimeout(() => {
              navigate("/home");
            }, 1000);
          });
      })
      .catch((error) => {
        console.error("Error en el login:", error);
      });
  };

  const logoutUser = (navigate) => {
    axios
      .post("http://localhost:4000/user/logout")
      .then(() => {
        navigate("/login");
        localStorage.clear();
        setState({
          userId: "",
          user: {},
          isAuthenticated: false,
          carrito: [],
        });
      })
      .catch((error) => {
        console.error("Error en el logout:", error);
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
        message.success("Registrado!", 1);
        navigate("/login");
      })
      .catch((error) => {
        message.error(error.response.data);
        console.error("Error en el registro:", { error });
        // setIsRegistered(false);
      });
  };

  const setUser = (user) => {
    setState((prevState) => ({
      ...prevState,
      user: user,
      isAuthenticated: true,
      books: [],
    }));
  };

  const getAllBooks = () => {
    axios
      .get("http://localhost:4000/user/products")
      .then((res) => {
        setState((s) => ({ ...s, books: res.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addToCart = (id) => {
    axios
      .post(`http://localhost:4000/cart/add/${id}/${state.userId}`)
      .then((user) => {
        message.success("Agregado a carrito", 1);
        const userId = user.data.id;
        axios
          .get(`http://localhost:4000/admin/users/${userId}`)
          .then((user) => {
            setState((s) => ({ ...s, user: user.data }));
            setCarrito(user.data.user_cartBuy);
          });
      })
      .catch((err) => console.log(err));
  };

  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:4000/cart/remove/${id}/${state.userId}`)
      .then((user) => {
        message.info("Eliminado del carrito");
        const userId = user.data.id;
        axios
          .get(`http://localhost:4000/admin/users/${userId}`)
          .then((user) => {
            setState((s) => ({ ...s, user: user.data }));
            setCarrito(user.data.user_cartBuy);
          });
      });
  };

  const isOnCart = (bookId) => {
    const arrayOfBooksId = state.user.user_cartBuy
      ? state.user.user_cartBuy.map((m) => m.bookId)
      : [];

    return arrayOfBooksId.includes(bookId); //booleano
  };

  const setCarrito = async () => {
    try {
      const carrito = await axios.get(
        `http://localhost:4000/cart/${state.userId}`
      );

      setState((prevState) => ({
        ...prevState,
        carrito: { cart: carrito.data.lastCart, books: carrito.data.cartData },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const setSearch = (booktitle) => {
    setState((prevState) => ({
      ...prevState,
      search: booktitle,
    }));
  };

  function SearchBook() {
    if (state.search !== "") {
      setState((state) => ({
        ...state,
        searchedBooks: state.books.filter((book) =>
          book.title.includes(state.search)
        ),
      }));
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        setUser,
        isOnCart,
        addToCart,
        registerUser,
        removeFromCart,
        setCarrito,
        getAllBooks,
        logoutUser,
        SearchBook,
        setSearch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
