const express = require("express");
const welcomeRouter = require("../welcome/welcome-router");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

const server = express();
server.use(express.json());
server.use("/", welcomeRouter);
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;
