const { User, Cart, Cart_buy } = require("../db/models");
const {
  getBookById,
} = require("../repositories/google_books_API/booksApi_eccomerce");
const { getAllCategories } = require("./CategoriesDb");

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

// const mail = `
//   <html>
//     <head>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           background-color: #f0f0f0;
//           padding: 20px;
//         }
//         .container {
//           width: 80%;
//           margin: 0 auto;
//           padding: 20px;
//           background-color: #fff;
//           border-radius: 10px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }
//         h1 {
//           color: #333;
//         }
//         p {
//           color: #555;
//         }
//         .total {
//           font-weight: bold;
//           font-size: 1.2em;
//           color: #FF5733;
//         }
//         .books {
//           margin-left: 20px;
//         }
//         .book {
//           margin-bottom: 10px;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="container">
//         <h1>Tu compra fue realizada con éxito</h1>
//         <p class="total">TOTAL: $${lastCart.price}</p>
//         <p>Cantidad de libros: ${cartData.length}</p>
//         <div class="books">
//           <p>Libros comprados:</p>
//           <ul>
//             ${cartData.map((m) => `<li class="book">${m.title}</li>`).join("")}
//           </ul>
//         </div>
//       </div>
//     </body>
//   </html>
// `;

// Resto del código para enviar el correo...

module.exports = {
  data,
  getUser,
  getHistory,
};
