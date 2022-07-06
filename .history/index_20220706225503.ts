// ***** -> importing packages  <- ********
require("dotenv").config();
require("./db/Connection.js");
import { Request, Response } from 'express';
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// user define packages
const ingredientsModel = require("./db/models/incredientsModel");
const itemsModel = require("./db/models/itemModel");

// ***** -> server instances || config  <- *****
const server = express();
const PORT = process.env.PORT || 8080;


// ***** ->   middlewares  <- *****
server.use(cors());
server.use(express.json());
server.use(cookieParser());


// ***** -> routes  <- *****
server.get("/", (req: Request, res: Response) => {
 console.log("server has started")
 res.status(200).send("server has started");
});

// admin routes
server.post("/api/v4/admin/addIngredients", async (req: Request, res: Response) => {
 // destructuring incoming req objects
 const { ingredients } = req.body;
 
 // insert data into db
 try {
  const data = await new ingredientsModel({
   ingredients: ingredients,
   createdOn: new Date().toLocaleDateString()
  });
  const result = await data.save();
 } catch (error) {
  res.status(500).send("500 !! Failed to add ingredients.");
 }
  
 res.status(200).send("Ingredients added succesfully");
});
server.post("/api/v4/admin/createBakeryItem", async(req: Request, res: Response) => {
  // destructuring incoming req objects
 const { type, ingredientDetails, cp, sp } = req.body;
 
 // insert data into db
 try {
  const data = await new itemsModel({
   type,
   ingredientDetails,
   cp,
   sp,
   createdOn: new Date().toLocaleDateString()
  });
  const result = await data.save();
 } catch (error) {
  res.status(500).send("500 !! Failed to add ingredients.");
 }
 
 res.send("Item created successfully !")
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