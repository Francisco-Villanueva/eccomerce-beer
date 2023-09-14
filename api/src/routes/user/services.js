const { generateToken, validateToken } = require("../../config/tokens");
const { Cart_buy, Cart } = require("../../db/models");
const User = require("../../db/models/User");
const { data } = require("../../utils/Data");

const { enviarCorreo } = require("../../repositories/mailer/mailer");

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const userToCheck = await User.findOne({
      where: {
        email,
      },
    });

    // console.log(userToCheck);
    if (userToCheck) {
      return res.status(400).send("This mail has been already registered!");
    }

    const newUser = await User.create({
      email,
      username: name,
      password,
    });

    const newCart = await Cart.create({ userId: newUser.id });

    await newUser.update({ currentCart: newCart.id });
    res.status(201).json(newUser);
  } catch (error) {
    console.log({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userToCheck = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userToCheck) {
      return res.sendStatus(401);
    }

    const pwCheck = await userToCheck.validatePassword(password);

    if (!pwCheck) {
      return res.sendStatus(401);
    } else {
      const payload = {
        id: userToCheck.id,
        email: userToCheck.email,
        username: userToCheck.username,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.send(payload);
    }
  } catch (error) {
    console.log({ error });
  }
};

const logout = (req, res) => {
  const { token } = req.cookies;
  res.clearCookie(token);

  res.sendStatus(204);
};

const secret = async (req, res) => {
  const { token } = req.cookies;
  const { user } = validateToken(token);

  // console.log(user);
  req.user = user;
  res.send(user);
};

const me = async (req, res) => {
  res.send(req.user);
};

const editProfile = async (req, res) => {
  const { email, password, username } = req.body;
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log("error trying to update profile", error);
  }
};

const checkout = async (req, res) => {
  try {
    const { userId } = req.params;

    const { lastCart, arrayOfBooksId, cartData, user } = await data(userId);

    const currentCart = await Cart.findOne({
      where: { id: lastCart.id },
    });

    const currentDay = new Date(); //FECHA DE CIERRE DEL CARRITO

    await currentCart.update({ isOpen: false, date: currentDay });

    // // crear otro

    const newCart = await Cart.create({
      userId: user.id,
    });
    await user.update({
      currentCart: newCart.id,
    });

    const mail = `tu compra fue realizada con exito! \n TOTAL: $ ${
      lastCart.price
    } \n Canditda de libros: ${cartData.length} \n Libros comprados: ${cartData
      .map((m) => `\n\t => ${m.title}`)
      .join("")}`;

    enviarCorreo(mail, user.email);

    res.status(200).json({
      msg: "CARRITO CERRADO",
      mail,
      user: user.email,
      user: user.currentCart,
      carritoCerrado: currentCart,
      carritoNuevo: newCart,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const getHistoryCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { history } = await data(userId);

    res.status(200).json(history);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};
module.exports = {
  register,
  login,
  logout,
  secret,
  me,
  editProfile,
  checkout,
  getHistoryCart,
};
