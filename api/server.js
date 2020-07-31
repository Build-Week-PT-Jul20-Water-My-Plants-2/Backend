const express = require("express");
const cookieParser = require("cookie-parser");
const welcomeRouter = require("../welcome/welcome-router");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

const server = express();
server.use(express.json());
server.use(cookieParser());
server.use("/", welcomeRouter);
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use((req, res, next) => {
  return res.json({ errorMessage: "Route was not found" });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    errorMessage: "Something went wrong",
  });
});

module.exports = server;
