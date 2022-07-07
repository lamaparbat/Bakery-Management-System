import { Document } from "mongoose";

export default interface Order extends Document{
 product_id: String,
 product_name: String,
 quantity: Number,
 createdOn:String
}