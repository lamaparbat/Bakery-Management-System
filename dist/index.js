"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("./db/Connection.js");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ingredientsModel = require("./db/models/incredientsModel");
const itemsModel = require("./db/models/itemModel");
const server = express();
const PORT = process.env.PORT || 8080;
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.get("/", (req, res) => {
    console.log("server has started");
    res.status(200).send("server has started");
});
server.post("/api/v4/admin/addIngredients", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ingredients } = req.body;
    try {
        const data = yield new ingredientsModel({
            ingredients: ingredients,
            createdOn: new Date().toLocaleDateString()
        });
        const result = yield data.save();
    }
    catch (error) {
        res.status(500).send("500 !! Failed to add ingredients.");
    }
    res.status(200).send("Ingredients added succesfully");
}));
server.post("/api/v4/admin/createBakeryItem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, ingredientDetails, cp, sp } = req.body;
    try {
        const data = yield new itemsModel({
            type,
            ingredientDetails,
            cp,
            sp,
            createdOn: new Date().toLocaleDateString()
        });
        const result = yield data.save();
    }
    catch (error) {
        res.status(500).send("500 !! Failed to add ingredients.");
    }
    res.send("Item created successfully !");
}));
server.get("/api/v4/admin/getItemDetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield itemsModel.find();
        res.status(200).send(items);
    }
    catch (error) {
        res.status(500).send("500 INTERNAL SERVER ERORR !!");
    }
}));
server.post("/api/v4/customer/register", (req, res) => {
});
server.post("/api/v4/customer/login", (req, res) => {
});
server.get("/api/v4/customer/getProducts", (req, res) => {
});
server.post("/api/v4/customer/order", (req, res) => {
});
server.get("/api/v4/admin/getHistories", (req, res) => {
});
server.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
});
