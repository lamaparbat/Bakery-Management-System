"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const jwt = require("jsonwebtoken");
var tokenStack = [];
const VerifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.header('authorization') === undefined) {
        return res.status(404).send({
            message: "Token is empty !!"
        });
    }
    var access_token = req.header('authorization');
    access_token = access_token && access_token.substr(7, access_token.length);
    if (access_token && (tokenStack.includes(access_token) === false))
        return res.status(404).send({ message: "Token doesnt exist !!" });
    try {
        const res = yield jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY);
        next();
    }
    catch (err) {
        return res.status(404).send({
            message: "Session timeout."
        });
    }
});
const GenerateJWT = (uid) => {
    const access_token = jwt.sign({ id: uid }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "24h"
    });
    const refresh_token = jwt.sign({ id: uid }, process.env.REFRESH_TOKEN_KEY);
    tokenStack.push(access_token);
    return {
        access_token: access_token,
        refresh_token: refresh_token
    };
};
module.exports = { VerifyJWT, GenerateJWT };
