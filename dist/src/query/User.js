"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserById = exports.GetUserByEmail = exports.GetUsers = exports.CreateUser = void 0;
const connection_1 = __importDefault(require("../database/connection"));
async function CreateUser(data) {
    await (0, connection_1.default)("users").insert({ ...data });
    return "record created successfully";
}
exports.CreateUser = CreateUser;
async function GetUsers() {
    return await (0, connection_1.default)('users').select();
}
exports.GetUsers = GetUsers;
async function GetUserByEmail(data) {
    return await (0, connection_1.default)("users").where("email", data).first();
}
exports.GetUserByEmail = GetUserByEmail;
async function GetUserById(data) {
    return await (0, connection_1.default)("users").where("id", data).first();
}
exports.GetUserById = GetUserById;
