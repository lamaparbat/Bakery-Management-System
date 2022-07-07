import mongoose,{Schema} from "mongoose";
import Admin from "../../interface/admin";

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
 password: String
});

module.exports = mongoose.model<Admin>("admins", schema);