const { generateToken, validateToken } = require("../../config/tokens");
const User = require("../../db/models/User");

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const newUser = await User.create({
      email,
      username: name,
      password,
    });

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

module.exports = {
  register,
  login,
  logout,
  secret,
  me,
};
