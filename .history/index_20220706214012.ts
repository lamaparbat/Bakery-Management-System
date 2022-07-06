// ***** -> importing packages  <- ********
require("dotenv").config();
import { Request, Response } from 'express';
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
server.get("/", (req: Request, res:Response) => {
 console.log("server has started")
 res.status(200).send("server has started");
});

// admin routes
server.post("/api/v4/admin/addIngredients", (req: Request, res: Response) => {
  // destructuring incoming req objects
 const data = req.body;
});
server.post("/api/v4/admin/createBakeryItem", (req: Request, res: Response) => {
});
server.get("/api/v4/admin/getItemDetails", (req: Request, res: Response) => {
});

// customer routes
server.post("/api/v4/customer/register", (req: Request, res: Response) => {
});
server.post("/api/v4/customer/login", (req: Request, res: Response) => {
});
server.get("/api/v4/customer/getProducts", (req: Request, res: Response) => {
});
server.post("/api/v4/customer/order", (req: Request, res: Response) => {
});
server.get("/api/v4/admin/getHistories", (req: Request, res: Response) => {
});


// ***** -> port listener  <-  *****
server.listen(PORT, () => {
 console.log(`Listening on the port ${PORT}`);
})