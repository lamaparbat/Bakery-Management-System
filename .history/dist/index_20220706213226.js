"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const server = express();
const PORT = process.env.PORT || 8000;
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.get("/", (req, res) => {
    console.log("server has started");
    res.status(200).send("server has started");
});
server.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
});
