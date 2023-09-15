//CONTROLLERS FOR CART

const { Cart_buy, User, Cart } = require("../../db/models");
const { data, getUser } = require("../../utils/Data");
//ADD PRODUCTS
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cartData, lastCart, price, cartBuy, aux } = await data(userId);
    if (!cartData) {
      return res.status(200).json({ price, cartBuy, lastCart, cartData: [] });
    }
    const cart = await Cart.findOne({ where: { id: lastCart.id } });
    await cart.update({ price });
    res.status(200).json({ aux, price, cartBuy, lastCart, cartData });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

const add = async (req, res) => {
  const { bookId, userId } = req.params;
  // const {cantidad }= req.body estoy para ver la cantidad
  try {
    if (!userId)
      return res.status(400).json({ message: "User ID not provided." });

    const { lastCart, user } = await data(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!lastCart.isOpen) {
      return res.send("Crear carrito nuevo");
    }

    await Cart_buy.findOrCreate({
      where: {
        bookId,
        userId,
        cartId: lastCart.id,
      },
    });

    // await Cart.update({
    //   price:
    // })

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

//REMOVE PRODUCTS
const remove = async (req, res) => {
  const { bookId, userId } = req.params;

  try {
    if (!userId)
      return res.status(400).json({ message: "User ID not provided." });
    // const { user, lastCart } = await data(userId);

    const user = await getUser(userId);
    if (!user) return res.status(400).json({ message: "User not found." });

    let actualCartBuy = await Cart_buy.findOne({
      where: { userId, bookId, cartId: parseInt(user.currentCart) },
    });

    if (!actualCartBuy)
      return res.status(404).json({ message: "error trying to remove book" });

    await actualCartBuy.destroy();

    return res.status(200).json(user);
  } catch (error) {
    console.log("error trying to remove the product from the cart", error);
    res.status(401).send(error);
  }
};

//EDIT AMOUNT OF PRODUCTS
const editCount = async (req, res) => {
  const { bookId, userId } = req.params;
  const { newCount } = req.body;

  try {
    if (!userId) res.status(400).json({ message: "User ID not provided." });

    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Cart_buy,
        as: "user_cartBuy",
      },
    });
    if (!user) return res.status(400).json({ message: "User not found." });

    let actualCartBuy = await Cart_buy.findOne({
      where: { userId, bookId },
    });
    if (!actualCartBuy || newCount <= 0)
      res
        .status(404)
        .json({ message: "error trying to change the product's amount" });

    actualCartBuy.count = newCount;
    actualCartBuy.save();

    // const cart = await Cart.findOne({ where: { userId }, include: [Cart_buy] });

    // if (cart) {
    //   cart.cart_buys = await Cart_buy.findAll({ where: { cartId: userId } });
    //   await cart.save();
    // }

    return res
      .status(200)
      .json({ message: "Product'amount changed successfully." });
  } catch (error) {
    console.log("error trying to change the product's amount", error);
    res.status(401).send(error);
  }
};

const setCount = async (req, res) => {
  try {
    const { bookId, userId } = req.params;
    const { count } = req.body;
    const { lastCart } = await data(userId);

    const actualCartBuy = await Cart_buy.findOne({
      where: {
        bookId,
        userId,
        cartId: lastCart.id,
      },
    });

    if (!actualCartBuy) {
      return res.status(401).send("This cart buy does not exist!");
    }

    await actualCartBuy.update({
      count,
    });

    res.status(201).json({ msg: "Cantidad actualizada", actualCartBuy });
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = { add, remove, editCount, setCount, getCart };
