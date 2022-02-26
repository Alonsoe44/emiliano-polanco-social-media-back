require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");

const secret = process.env.SECRET_JWT;

const loginController = async (req, res, next) => {
  const loginErrorProtocol = () => {
    const loginError = new Error("Wrong credentials");
    loginError.status = 401;
    next(loginError);
  };
  const { username, password } = req.body;
  const userFounded = await User.findOne({ username });
  if (userFounded) {
    const passwordMatch = await bcrypt.compare(password, userFounded.password);
    if (passwordMatch) {
      const payloadUser = {
        name: userFounded.name,
        // eslint-disable-next-line no-underscore-dangle
        _id: userFounded._id,
      };
      const token = jwt.sign(payloadUser, secret);
      res.status(200).json({ token });
    } else {
      loginErrorProtocol();
    }
  } else {
    loginErrorProtocol();
  }
};

const registerController = async (req, res, next) => {
  const { name, username, password, lastName, email, birthDate } = req.body;
  if (!name || !username || !password) {
    const error = new Error("You must have a name, username and password");
    error.status = 400;
    next(error);
  } else {
    const repitedUser = await User.findOne({ username });

    if (repitedUser) {
      const error = new Error("The username isn't avaliable");
      error.status = 400;
      next(error);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        lastName,
        username,
        email,
        birthDate,
        password: hashedPassword,
        connections: [],
      };

      const createdUser = await User.create(newUser);
      const payloadUser = {
        name: createdUser.name,
        // eslint-disable-next-line no-underscore-dangle
        _id: createdUser._id,
      };

      const token = await jwt.sign(payloadUser, secret);
      res.json({ token });
    }
  }
};
module.exports = { loginController, registerController };
