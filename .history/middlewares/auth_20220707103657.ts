require("dotenv").config()
import express, { Request, Response } from 'express';
const jwt = require("jsonwebtoken");

// store each new token
var tokenStack:Array<string> = [];


//verify jwt token
const VerifyJWT = async (req:Request, res:Response, next:express.NextFunction) => {
 //token validation
 if (req.header('authorization') === undefined) {
  return res.status(404).send({
   message: "Token is empty !!"
  });
 }
 var access_token:String|undefined = req.header('authorization')

 //remove the bearer text from token
 access_token = access_token && access_token.substr(7, access_token.length);
 
 if (tokenStack.includes(access_token) === false)
  return res.status(404).send({ message: "Token doesnt exist !!" });
 
 try {
  const res = await jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY);
  next()
 } catch (err) {
  return res.status(404).send({
   message: "Session timeout."
  })
 }
}


//generate jwt token
const GenerateJWT = (uid: String) => {
 const access_token = jwt.sign({ id: uid }, process.env.ACCESS_TOKEN_KEY, {
  expiresIn: "24h"
 });
 const refresh_token = jwt.sign({ id: uid }, process.env.REFRESH_TOKEN_KEY);
 return {
  access_token: access_token,
  refresh_token: refresh_token
 }
}


module.exports = { VerifyJWT, GenerateJWT };