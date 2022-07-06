import { Document } from "mongoose";

export default interface Bakery extends Document{
 ingredients: Array<string>,
 createdOn:string
}