// ***** -> importing packages  <- ********
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");


// ***** -> server instances || config  <- *****
const server = express();
const PORT = process.env.PORT || 8000;


// ***** ->   middlewares  <- *****
server.use(cors());
server.use(express.json());
server.use(cookieParser());


// ***** -> routes  <- *****
server.get("/", (req: any, res: any) => {
 console.log("server has started")
 res.status(200).send("server has started");
});


// ***** -> port listener  <-  *****
server.listen(PORT, () => {
 console.log(`Listening on the port ${PORT}`);
})