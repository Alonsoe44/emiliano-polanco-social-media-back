require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { notFoundError, internalServerError } = require("./middlewares/errors");

const generalRouter = require("./routers/generalRouter");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(generalRouter);

app.use(notFoundError);
app.use(internalServerError);

module.exports = app;
