import mongoose, {Schema} from "mongoose";


const schema:Schema = new mongoose.Schema({
 product_id: {
  type: String, 
  require:true
 },
 product_name: {
  type: String,
  require:true
 },
 quantity: {
  type: Number,
  require:true
 },
 createdOn: String
});

module.exports = mongoose.model("order", schema);