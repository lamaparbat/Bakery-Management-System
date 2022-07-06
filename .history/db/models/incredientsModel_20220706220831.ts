import mongoose from "mongoose";
import { Schema, Model } from "mongoose";

// creating schemas
const schema:Schema = new mongoose.Schema({
 incredients: Array,
 createdOn:[String]
});

// exporting incredients models
module.exports = new mongoose.model<Model>("ingredients", schema);