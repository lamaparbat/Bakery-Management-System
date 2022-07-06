import mongoose from "mongoose";
import { Schema } from "mongoose";
import Bakery from "../../bakery";

// creating schemas
const schema:Schema = new mongoose.Schema({
 incredients: Array,
 createdOn:[String]
});

// exporting incredients models
module.exports = mongoose.model<Bakery>("ingredients", schema);