import mongoose,{Schema} from "mongoose";
import Customer from "../../interface/customer";

const schema:Schema = new mongoose.Schema({
 username: String,
 email: String,
 password: String,
 createdOn:String
});

module.exports = mongoose.model<Customer>("customer", schema);