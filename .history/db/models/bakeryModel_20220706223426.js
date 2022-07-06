import mongoose, {Schema} from "mongoose";

const schema: Schema = new mongoose.Schema({
 ingredients: [String],
 createdOn:String
});