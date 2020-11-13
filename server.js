//only use dotenv config if in development
if(process.env.NODE_ENV === "development") require("dotenv").config();

const express = require('express');
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

//routes
const routes = require("./routes/index");
server.use("/api", routes);

module.exports = server;