const express = require("express");
const welcomeRouter = require("../welcome/welcome-router");

const server = express();
server.use(express.json());
server.use("/", welcomeRouter);

module.exports = server;
