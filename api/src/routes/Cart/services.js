//CONTROLLERS FOR CART

const { Cart_buy, User } = require("../../db/models");
const { data } = require("../../utils/Data");
//ADD PRODUCTS
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { cartData, lastCart } = await data(userId);

    res.status(200).json({ lastCart });
  } catch (error) {
    res.status(401).send(error);
  }
};
const add = async (req, res) => {
  const { bookId, userId } = req.params;
  // const {cantidad }= req.body estoy para ver la cantidad
  try {
    if (!userId)
      return res.status(400).json({ message: "User ID not provided." });

    const { user, lastCart } = await data(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!lastCart.isOpen) {
      return res.send("Crear carrito nuevo");
    }

    let actualCartBuy = await Cart_buy.findOrCreate({
      where: {
        bookId,
        userId,
        cartId: lastCart.id,
      },
    });

    return res.status(200).json({ actualCartBuy, user });
  } catch (error) {
    res.status(401).send(error);
  }
};

//REMOVE PRODUCTS
const remove = async (req, res) => {
  const { bookId, userId } = req.params;

  try {
    if (!userId)
      return res.status(400).json({ message: "User ID not provided." });
    const { user, lastCart } = await data(userId);

    if (!user) return res.status(400).json({ message: "User not found." });

    let actualCartBuy = await Cart_buy.findOne({
      where: { userId, bookId },
    });

    if (!actualCartBuy)
      return res.status(404).json({ message: "error trying to remove book" });

    if (actualCartBuy.count > 1) {
      actualCartBuy.count -= 1;
      await actualCartBuy.save();
    } else {
      await actualCartBuy.destroy();
    }

    // const cart = await Cart.findOne({ where: { userId } });

    // if (cart) {
    //   cart.cart_buys = await Cart_buy.findAll({ where: { cartId: userId } });
    //   await cart.save();
    // }

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
    const { user, lastCart } = await data(userId);

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
