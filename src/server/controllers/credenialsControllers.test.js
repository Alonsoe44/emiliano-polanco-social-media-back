const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");
const {
  loginController,
  registerController,
} = require("./credentialsControllers");

jest.mock("../../dataBase/models/User");

describe("Given a loginController", () => {
  describe("When it receives a req a username and password that matches the database", () => {
    test.only("Then it should call the method json of res and the method sign of jwt", async () => {
      const password = "4324";
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = {
        username: "Giorno",
        password,
      };

      const dataBaseUser = {
        username: "Giorno",
        password: hashedPassword,
      };

      const token = "Iam a token";

      User.findOne = jest.fn().mockResolvedValue(dataBaseUser);

      jwt.sign = jest.fn().mockReturnValue(token);

      const req = {
        body: user,
      };

      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      await loginController(req, res);

      expect(res.json).toHaveBeenCalledWith({ token });
      expect(User.findOne).toHaveBeenCalledWith({ username: user.username });
    });
  });
});

describe("Given a registerController", () => {
  describe("When it receibes a reques with an username, name and password", () => {
    test.only("Then it should call the method json of req with a message", async () => {
      const req = {
        body: {
          name: "attention",
          username: "andAttention",
          password: "closeyoureyes",
        },
      };
      const res = {
        json: jest.fn(),
      };

      const token = "I am a token";
      User.findOne = jest.fn().mockResolvedValue("");
      User.create = jest.fn().mockResolvedValue("");
      jwt.sign = jest.fn().mockResolvedValue(token);

      await registerController(req, res);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
});
