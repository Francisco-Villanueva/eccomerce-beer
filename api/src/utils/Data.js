const { User, Cart, Cart_buy } = require("../db/models");
const {
  getBookById,
} = require("../repositories/google_books_API/booksApi_eccomerce");

const getUser = async (userId) => {
  const user = await User.findOne({
    where: { id: userId },
    include: {
      model: Cart,
      as: "user_cart",
      include: {
        model: Cart_buy,
        as: "cart_cartBuy",
      },
    },
  });

  return user;
};
const data = async (userId) => {
  const user = await getUser(userId);
  const { user_cart, currentCart } = user;
  const lastCart = user_cart.filter((e) => e.id === parseInt(currentCart))[0];

  // console.log(lastCart.length);
  const arrayOfBooksId = lastCart
    ? lastCart.cart_cartBuy
        .sort((a, b) => a.createdAt - b.createdAt)
        .map((m) => m.bookId)
    : [];

  let cartData;
  let price;
  let cart;
  if (arrayOfBooksId.length > 0) {
    cartData = await getCartData(arrayOfBooksId);

    price = arrayOfBooksId.length
      ? cartData.reduce(
          (a, b) =>
            a + Math.trunc(b.price) * getCount(lastCart.cart_cartBuy, b.bookId),
          0
        )
      : 0;
    cart = await Cart.findOne({ where: { id: lastCart.id } });
    await cart.update({ price });
  }

  // const history = await getHistory(user_cart);
  return {
    // history,
    user,
    user_cart,
    lastCart,
    arrayOfBooksId,
    cartData,
    price,
    cartBuy: lastCart.cart_cartBuy || [],
  };
};

const getCount = (cartBuy, bookId) => {
  try {
    // FUNCION PARA OBTENER LA CANTIDAD DE CADA LIBRO y ESTABLECER EL PRECIO TOTAL
    const filterdCartBuy = cartBuy.filter((e) => e.bookId === bookId)[0];

    return filterdCartBuy.count;
  } catch (error) {
    console.log(error);
  }
};

async function getCartData(arrayOfBooksId) {
  const fetchBookDetail = async (bookId) => {
    try {
      const response = await getBookById(bookId);

      return response;
    } catch (error) {
      console.error("Error al obtener detalles de la película:");
      // return null;
    }
  };
  const fetchAllBooksDetails = async () => {
    try {
      const detailsPromises_Books = arrayOfBooksId.map((idBook) =>
        fetchBookDetail(idBook)
      );

      const books_Details = await Promise.all(detailsPromises_Books);
      // console.log({ books_Details });

      return books_Details;
    } catch (error) {
      console.log({ MSG: "nO ANDA EL FETCH ALL DATA" });
    }
  };

  return fetchAllBooksDetails();
}

const getHistory = async (user_cart) => {
  const old_carts = user_cart.filter((e) => !e.isOpen);

  let history = [];
  for (let index = 0; index < old_carts.length; index++) {
    // response = { ...response, [index]: {} };
    const arrayOfBooksId = old_carts[index].cart_cartBuy.map((b) => b.bookId);
    const cartData = await getCartData(arrayOfBooksId);

    history.push({
      cart: old_carts[index],
      booksData: cartData,
    });
  }

  return history;
};
module.exports = {
  data,
  getUser,
};
