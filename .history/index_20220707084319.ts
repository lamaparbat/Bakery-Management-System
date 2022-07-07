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
const customerModel = require("./db/models/customerModel");

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
 
 res.send("Item created successfully !");
});
server.get("/api/v4/admin/getItemDetails", async(req: Request, res: Response) => {
 // db mapping
 try {
  const items = await itemsModel.find();
  res.status(200).send(items);
 } catch (error) {
  res.status(500).send("500 INTERNAL SERVER ERORR !!");
 }
});

// customer routes
server.post("/api/v4/customer/register", async (req: Request, res: Response) => {
  // destructuring incoming req object
  const { username, email, password } = req.body;
  
  // db insertion
  try {
    const data = new customerModel({ username, email, password });
    const result = await data.save();
  } catch (error) {
    res.status(500).send("500 Failed to register user.")
  }
  res.status(200).send("User registered successfully.")
});
server.post("/api/v4/customer/login", async(req: Request, res: Response) => {
  // destructuring incoming req object
  const { email, password } = req.body;
  
  // db mapping
  try {
    const result = await customerModel.find({ email, password });
    console.log(result)
  } catch (error) {
    res.status(500).send("500 Failed to register user.")
  }
  res.status(200).send({
    message: "User registered successfully.",
    data: {},
    token:{}
  })
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