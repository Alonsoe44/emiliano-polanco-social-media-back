const { default: mongoose } = require("mongoose");
const debug = require("debug")("social-app:database");

const connectDataBase = (connectionLogin) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.connect(connectionLogin, (error) => {
      if (error) {
        reject(error);
        return;
      }
      debug("Database connected");
      resolve();
    });
  });

module.exports = connectDataBase;
