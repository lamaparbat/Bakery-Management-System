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
const bcrypt = require("bcryptjs");
const ingredientsModel = require("./db/models/incredientsModel");
const itemsModel = require("./db/models/itemModel");
const customerModel = require("./db/models/customerModel");
const adminModel = require("./db/models/adminModel");
const orderModel = require("./db/models/orderModel");
const isProductGenuine = require("./db/library/checkProduct");
const calculatePrice = require("./db/library/calculatePrice");
const auth = require("./middlewares/auth");
const server = express();
const PORT = process.env.PORT || 8080;
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.get("/", (req, res) => {
    console.log("server has started");
    res.status(200).send("server has started");
});
server.post("/api/v4/admin/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield adminModel.find({ email, password });
        return res.status(200).send({
            message: "Admin logged in successfully.",
            data: {
                username: result[0].username
            },
            token: auth.GenerateJWT(result[0].email)
        });
    }
    catch (error) {
        return res.status(500).send("500 Failed to login admin.");
    }
}));
server.post("/api/v4/admin/addIngredients", auth.VerifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
server.post("/api/v4/admin/createBakeryItem", auth.VerifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
server.post("/api/v4/customer/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const HASH_SALT_ROUND = process.env.HASH_SALT_ROUND;
    const encrypted_password = HASH_SALT_ROUND && (yield bcrypt.hash(password, parseInt(HASH_SALT_ROUND)));
    try {
        const data = new customerModel({ username, email, password: encrypted_password });
        const result = yield data.save();
    }
    catch (error) {
        return res.status(500).send("Failed to register.");
    }
    return res.status(200).send("User registered successfully.");
}));
server.post("/api/v4/customer/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const result = yield customerModel.find({ email });
        const ispasswordValid = yield bcrypt.compare(password, result[0].password);
        !ispasswordValid && res.status(404).send("Invalid password !!");
        return res.status(200).send({
            message: "User logged in successfully.",
            data: {
                username: result[0].username
            },
            token: auth.GenerateJWT(result[0].email)
        });
    }
    catch (error) {
        return res.status(500).send("500 Failed to login user.");
    }
}));
server.post("/api/v4/customer/order", auth.VerifyJWT, (req, res) => {
});
server.get("/api/v4/admin/getHistories", auth.VerifyJWT, (req, res) => {
});
server.get("/api/v4/product/getProducts", auth.VerifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield itemsModel.find();
        res.status(200).send(items);
    }
    catch (error) {
        res.status(500).send("500 INTERNAL SERVER ERORR !!");
    }
}));
server.get("/api/v4/product/getDetails", auth.VerifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        const items = yield itemsModel.find({ _id });
        return res.status(200).send(items);
    }
    catch (error) {
        return res.status(500).send("Items not found !!");
    }
}));
server.post("/api/v4/order", auth.VerifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_id, product_name, quantity } = req.body;
    try {
        if (!isProductGenuine(product_id))
            return res.status(404).send("Product not found !!");
        const itemObject = yield itemsModel.find({ type: product_name });
        const { sp } = itemObject[0];
        const price = calculatePrice(quantity, sp);
        const date = new Date().toLocaleDateString();
        const data = new orderModel({ product_id, product_name, quantity, price, buyer: "Parbat", createdOn: date });
        const result = yield data.save();
        return res.status(200).send({
            message: `Order placed successfully !!. Your order ID is ${result._id}`,
            bill: {
                order_id: result._id,
                quantity: quantity,
                price: price,
                buyer: "Parbat",
                date: date
            }
        });
    }
    catch (error) {
        return res.status(500).send("500 INTERNAL SERVER ERROR !");
    }
}));
server.get("/api/v4/orderHistories", auth.VerifyJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderModel.find({ buyer: "Parbat" });
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("500 INTERNAL SERVER ERROR");
    }
}));
server.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
});
