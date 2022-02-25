const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
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
      userId: {
        type: Schema.Types.ObjectId,
      },
      friendly: Boolean,
    },
  ],
});

const User = model("User", UserSchema, "Users");

module.exports = User;
