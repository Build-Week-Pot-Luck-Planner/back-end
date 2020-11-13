require("dotenv").config()
const express = require('express');
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

//routes
const routes = require("./routes/index");
server.use("/api", routes);

module.exports = server;