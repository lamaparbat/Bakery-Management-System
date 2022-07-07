import mongoose from "mongoose";

const orderModel = require("./db/models/orderModel");

const isProductGenuine = async (pid: String) => {
    try {
     const result = await orderModel.find({ _id: pid })
     console.log(result)
    } catch (error) {
     return false;
    }
}

module.exports = isProductGenuine;