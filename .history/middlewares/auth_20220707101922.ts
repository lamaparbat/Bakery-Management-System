import express, { Request, Response } from 'express';
const jwt = require("jsonwebtoken");


//verify jwt token
const VerifyJWT = async (req:Request, res:Response, next:express.NextFunction) => {
 //token validation
 if (req.header('authorization') === undefined || req.header('authorization').length <= 9) {
  return res.status(404).send({
   message: "Token is empty !!"
  });
 }
 var access_token:String|undefined = req.header('authorization')

 //remove the bearer text from token
 access_token = access_token.substr(7, access_token.length);

 try {
  const res = await jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY);
  next()
 } catch (err) {
  return res.status(404).send({
   message: "Session timeout."
  })
 }
}