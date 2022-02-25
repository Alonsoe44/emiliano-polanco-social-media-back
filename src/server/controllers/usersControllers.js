const User = require("../../database/models/User");

const getUsersController = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};

const editProfileController = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {
    new: true,
  });
  res.json(updatedUser);
};

module.exports = { getUsersController, editProfileController };
