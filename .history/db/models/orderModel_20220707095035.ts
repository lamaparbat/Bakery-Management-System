import mongoose, { Schema } from "mongoose";
import Order from "../../interface/order";

const schema:Schema = new mongoose.Schema({
 product_id: {
  type: String, 
  require:true
 },
 product_name: {
  type: String,
  require:true
 },
 quantity: {
  type: Number,
  require:true
 },
 price:Number,
 createdOn: String
});

module.exports = mongoose.model<Order>("order", schema);