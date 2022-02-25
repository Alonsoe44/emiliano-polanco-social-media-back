const chalk = require("chalk");
const debug = require("debug")("robots-app:errors");

const notFoundError = (req, res) => {
  res.status(404).json({ error: true, message: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const internalServerError = (err, req, res, next) => {
  debug(chalk.red(`Error: ${err.message}`));
  const errorCode = err.status ?? 500;
  const errorMessage = err.status ? err.message : "General pete";
  res.status(errorCode).json({ error: true, message: errorMessage });
};

module.exports = {
  notFoundError,
  internalServerError,
};
