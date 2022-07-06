import { Document } from "mongoose";

export default interface Bakery extends Document{
 ingredients:Array<String>,
 createdOn:string
}

export default interface Items extends Document{
 type: String,
 ingredientDetails: [{
  name: String,
  qty:String
 }],
 cp: Number,
 sp:Number,
 createdOn:string
}