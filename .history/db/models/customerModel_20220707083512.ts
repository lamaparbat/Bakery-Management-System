import mongoose from "mongoose";

const schema = new mongoose.Schema({
 username: String,
 email: String,
 password: String,
 createdOn:String
});

module.exports = mongoose.model("customer", schema);