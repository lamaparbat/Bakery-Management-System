import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema:Schema = new mongoose.Schema({
 ingredients: [String],
 createdOn:String
});