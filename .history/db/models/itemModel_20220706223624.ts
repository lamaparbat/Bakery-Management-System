import mongoose, { Schema } from "mongoose";

const schema: Schema = new mongoose.Schema({
 itemType:String,
 ingredients: [String],
 createdOn:String
});