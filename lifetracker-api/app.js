const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { NotFoundError } = require("./utils/errors");
const config = require("./config");

const security = require("./middleware/security");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const exerciseRoutes = require("./routes/exercise");
const sleepRoutes = require("./routes/sleep");
const nutritionRoutes = require("./routes/nutrition");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/sleep", sleepRoutes);
app.use("/exercise", exerciseRoutes);
app.use("/nutrition", nutritionRoutes);

app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  });
});

app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  if (!config.IS_TESTING) console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
