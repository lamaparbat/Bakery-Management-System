import mongoose from "mongoose";

// creating schemas
const schema:Object = new mongoose.Schema({
 incredients: Array,
 createdOn:[String]
});

// exporting incredients models
const 