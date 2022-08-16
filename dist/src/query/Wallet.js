"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserBalance = exports.CreditWallet = exports.CreateWallet = void 0;
const connection_1 = __importDefault(require("../database/connection"));
async function CreateWallet(data) {
    await (0, connection_1.default)("wallets").insert({ ...data });
    return "wallet credited successfully";
}
exports.CreateWallet = CreateWallet;
async function CreditWallet(user_id, update) {
    await (0, connection_1.default)("wallets").where("user_id", user_id).update(update);
    return "successful";
}
exports.CreditWallet = CreditWallet;
async function GetUserBalance(data) {
    return await (0, connection_1.default)("wallets").where("user_id", data).first();
}
exports.GetUserBalance = GetUserBalance;
