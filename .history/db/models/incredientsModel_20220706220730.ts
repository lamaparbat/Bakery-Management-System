import mongoose from "mongoose";
import { Schema } from "mongoose";

// creating schemas
const schema:Schema = new mongoose.Schema({
 incredients: Array,
 createdOn:[String]
});

// exporting incredients models
module.exports = new mongoose.model("ingredients", schema);