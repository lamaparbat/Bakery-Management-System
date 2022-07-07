"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    product_id: {
        type: String,
        require: true
    },
    product_name: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    price: Number,
    buyer: {
        type: String,
        require: true
    },
    createdOn: String
});
module.exports = mongoose_1.default.model("order", schema);
