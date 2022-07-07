import { Document } from "mongoose";

export default interface Admin extends Document{
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
 createdOn: String
}