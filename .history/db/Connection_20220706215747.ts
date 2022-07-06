require("dotenv").config();
const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 serverApi: ServerApiVersion.v1
}).then(() => console.log("Database connection succesfull"))
.catch (() => console.log("Databse connection error"));