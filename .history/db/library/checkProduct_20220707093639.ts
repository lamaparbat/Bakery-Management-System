import mongoose from "mongoose";

const orderModel = require("../models/orderModel");

const isProductGenuine = async (pid: String) => {
    try {
     const result = await orderModel.find({ _id: pid })
     console.log(result.length)
    } catch (error) {
     return false;
    }
}

module.exports = isProductGenuine;