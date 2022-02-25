const generalRouter = require("express").Router();
const {
  loginController,
  registerController,
} = require("../controllers/credentialsControllers");
const {
  getUsersController,
  editProfileController,
} = require("../controllers/usersControllers");
const { tokenValidator } = require("../middlewares/tokenValidator");

generalRouter.post("/", loginController);
generalRouter.post("/register", registerController);
generalRouter.get("/home", tokenValidator, getUsersController);
generalRouter.patch("/edit-profile", tokenValidator, editProfileController);

module.exports = generalRouter;
