const express = require("express");
const cookieParser = require("cookie-parser");
const welcomeRouter = require("../welcome/welcome-router");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");
const cors = require('cors')
const helmet = require('helmet')

const server = express();

// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// })

server.use(express.json());
server.use(helmet())
server.use(cors())
server.use(cookieParser());
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
