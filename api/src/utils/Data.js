const { User, Cart, Cart_buy } = require("../db/models");
const {
  getBookById,
} = require("../repositories/google_books_API/booksApi_eccomerce");

const data = async (userId) => {
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
  const { user_cart } = user;
  const lastCart = user_cart[user_cart.length - 1];

  const arrayOfBooksId = lastCart.cart_cartBuy.map((m) => m.bookId);
  let cartData;
  let price;
  if (arrayOfBooksId.length > 0) {
    cartData = await getCartData(arrayOfBooksId);
    price = cartData.reduce((a, b) => a.price + b.price);
    const cart = await Cart.findOne({ where: { id: lastCart.id } });
    await cart.update({ price });
  }

  return {
    user,
    user_cart,
    lastCart,
    arrayOfBooksId,
    cartData,
    price,
  };
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
module.exports = {
  data,
};
