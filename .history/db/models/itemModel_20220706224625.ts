import mongoose, { mongo, Schema } from "mongoose";
import Items from "../../interface/bakery";

const schema: Schema = new mongoose.Schema({
 itemType:String,
 ingredientDetails: [{
  name: String,
  qty:String
 }],
 createdOn:String
});

module.exports = mongoose.model<Items>("items", schema);