import mongoose from "mongoose";

const orderModel = require("../models/orderModel");

const isProductGenuine = async (pid: String) => {
    try {
     const result = await orderModel.find({ _id: pid })
     if (result.length > 0) 
      return true
     return false;
    } catch (error) {
     return false;
    }
}

module.exports = isProductGenuine;