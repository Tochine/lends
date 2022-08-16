"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSessionByToken = exports.CreateSession = void 0;
const connection_1 = __importDefault(require("../database/connection"));
async function CreateSession(data) {
    await (0, connection_1.default)("sessions").insert({ ...data });
    return "session stored successfully";
}
exports.CreateSession = CreateSession;
async function GetSessionByToken(data) {
    return await (0, connection_1.default)("sessions").where("token", data).first();
}
exports.GetSessionByToken = GetSessionByToken;
