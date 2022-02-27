const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  lastName: String,
  email: String,
  birthDate: String,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  connections: [
    {
      userId: String,
      relation: String,
    },
  ],
});

const User = model("User", UserSchema, "Users");

module.exports = User;
