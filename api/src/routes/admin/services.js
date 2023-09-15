const { Cart_buy, User, Cart, Category } = require("../../db/models");
const { createCategory, deleteCategory } = require("../../utils/CategoriesDb");
const { getUser } = require("../../utils/Data");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Cart,
        as: "user_cart",
        include: {
          model: Cart_buy,
          as: "cart_cartBuy",
        },
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log({ error });
    res.status(401).send(error);
  }
};

const switchAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await getUser(userId);
    if (!user) {
      return res.status(401).send(`user not found! \n id: ${userId}`);
    }

    const adminState = user.isAdmin;

    await user.update({
      isAdmin: !adminState,
    });

    const users = await User.findAll({
      include: {
        model: Cart,
        as: "user_cart",
        include: {
          model: Cart_buy,
          as: "cart_cartBuy",
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(401).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).send(`user not found! \n id: ${userId}`);
    }

    await user.destroy();

    res.status(200).json({ msg: "User deleted! ", userDeleted: user });
  } catch (error) {
    res.status(401).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: {
        model: Cart,
        as: "user_cart",
        include: {
          model: Cart_buy,
          as: "cart_cartBuy",
        },
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).send(error);
  }
};

const newCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const response = await createCategory(category);

    res.status(201).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

const destoryCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await deleteCategory(category);

    res.status(201).json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = {
  getAllUsers,
  switchAdmin,
  deleteUser,
  getUserById,
  newCategory,
  destoryCategory,
};
