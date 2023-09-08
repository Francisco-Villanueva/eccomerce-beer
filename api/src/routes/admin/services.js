const { Cart_buy, User } = require("../../db/models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Cart_buy,
        as: "user_cartBuy",
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log({ error });
    res.status(401).send(error);
  }
};

const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).send(`user not found! \n id: ${userId}`);
    }

    await user.update({
      isAdmin: true,
    });

    res.status(200).json(user);
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
        model: Cart_buy,
        as: "user_cartBuy",
      },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).send(error);
  }
};
module.exports = {
  getAllUsers,
  makeAdmin,
  deleteUser,
  getUserById,
};
