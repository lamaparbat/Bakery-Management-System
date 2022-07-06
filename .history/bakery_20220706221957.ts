import { Document } from "mongoose";

export default interface Bakery extends Document{
 ingredients:string[],
 createdOn:string
}