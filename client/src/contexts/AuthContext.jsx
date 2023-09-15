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
    totalPrice: 0,
    history: [],
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
            message.success(`Welcome ${user.username}`, 1);
            setTimeout(() => {
              navigate("/home");
            }, 1000);
          });
      })
      .catch((error) => {
        // console.error("Error en el login:", error.response.data);
        message.error(` ${error.response.data}`);
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
        // console.log("Registro exitoso:", user);
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
      // books: [],
    }));
  };

  const getAllBooks = () => {
    axios
      //.get("http://localhost:4000/admin/books")
      .get("http://localhost:4000/user/products")
      .then((res) => {
        const customBooks = res.data.map((book) => {
          return {
            // bookId: book.bookId ? book.bookId : book.id,
            bookId: book.bookId ?? book.id,
            title: book.title,
            description: book.description,
            img: book.img ?? "",
            rating: book.rating ?? 1,
            price: book.price ?? 0,
            date: book.date ?? "",
            categories: book.categories ?? [],
          };
        });
        // console.log(customBooks);
        setState((s) => ({ ...s, books: customBooks }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addToCart = (id) => {
    axios
      .post(`http://localhost:4000/cart/add/${id}/${state.user.id}`)
      .then((user) => {
        setCarrito();
        message.success("Agregado a carrito", 1);
        const userId = user.data.id;
        // console.log(user.data);
        axios
          .get(`http://localhost:4000/admin/users/${userId}`)
          .then((user) => {
            setState((s) => ({ ...s, user: user.data }));
          });
      })
      .catch((err) => console.log(err));
  };

  const removeFromCart = (id) => {
    axios
      .delete(`http://localhost:4000/cart/remove/${id}/${state.user.id}`)
      .then((user) => {
        setCarrito();
        message.info("Eliminado del carrito");
        const userId = user.data.id;
        axios
          .get(`http://localhost:4000/admin/users/${userId}`)
          .then((user) => {
            setState((s) => ({ ...s, user: user.data }));
          });
      });
  };

  const isOnCart = (bookId) => {
    const arrayOfBooksId = state.carrito.books
      ? state.carrito.books.map((m) => m.bookId)
      : [];

    // console.log(arrayOfBooksId.includes(bookId));
    return arrayOfBooksId.includes(bookId); //booleano
  };

  const setCarrito = async () => {
    try {
      const carrito = await axios.get(
        `http://localhost:4000/cart/${state.userId}`
      );

      // console.log("RESPUESTA DEL BACK\n", carrito.data);
      setState((prevState) => ({
        ...prevState,
        totalPrice: carrito.data.price,
        carrito: {
          cart: carrito.data.lastCart,
          books: carrito.data.cartData,
        },
      }));

      // console.log("DESPUES DEL SETSTATE\n", state.carrito, state.totalPrice);
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

  function setCount(count, bookId) {
    axios
      .put(`http://localhost:4000/cart/edit/${bookId}/${state.userId}`, {
        count,
      })
      .then((res) => {
        setCarrito();
        console.log("CAMBIO DE CANTIDAD\n", res.data);
      });
  }

  const setHistory = async (userId) => {
    try {
      const history = await axios.get(
        `http://localhost:4000/user/history/${userId}`
      );

      setState((s) => ({ ...s, history: history.data }));
    } catch (error) {
      console.log(err);
    }
  };

  const createBook = (newBook, navigate) => {
    axios
      .post("http://localhost:4000/admin/books/createBook", newBook)
      .then((newBook) => {
        message.success("Libro Creado!");
        navigate("/home");
        getAllBooks();
      })
      .catch((err) => console.log(err));
  };
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
        setCount,
        setHistory,
        createBook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
