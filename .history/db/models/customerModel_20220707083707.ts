import mongoose from "mongoose";
import Customer from "../../interface/customer";

const schema:Customer = new mongoose.Schema({
 username: String,
 email: String,
 password: String,
 createdOn:String
});

module.exports = mongoose.model("customer", schema);