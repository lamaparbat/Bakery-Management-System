import mongoose, { mongo, Schema } from "mongoose";

const schema: Schema = new mongoose.Schema({
 itemType:String,
 ingredients: [String],
 createdOn:String
});

module.exports = mongoose.model<any>("items", schema);