import mongoose, { Schema } from "mongoose";
import Bakery from "../../interface/bakery";

// creating schemas
const schema:Schema = new mongoose.Schema({
 ingredients: [String],
 createdOn:String
});

// exporting incredients models
module.exports = mongoose.model<Bakery>("ingredients", schema);