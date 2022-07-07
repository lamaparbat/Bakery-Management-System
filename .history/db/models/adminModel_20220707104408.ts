import mongoose,{Schema} from "mongoose";
import Customer from "../../interface/customer";

const schema:Schema = new mongoose.Schema({
 username: {
  type: String,
  required: true,
  unique: true
 },
 email: {
  type: String,
  required: true,
  unique: true
 },
 password: String,
 createdOn:String
});

module.exports = mongoose.model<Customer>("customer", schema);