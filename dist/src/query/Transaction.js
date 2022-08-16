"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTranx = void 0;
const connection_1 = __importDefault(require("../database/connection"));
async function CreateTranx(data) {
    await (0, connection_1.default)("transactions").insert({ ...data });
    return "transaction created successfully";
}
exports.CreateTranx = CreateTranx;
