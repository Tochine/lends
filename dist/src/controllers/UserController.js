"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
const UserValidator_1 = require("../validators/UserValidator");
const utils = __importStar(require("../utils"));
const uuidv4_1 = require("uuidv4");
class UserController {
}
exports.default = UserController;
_a = UserController;
UserController.createUser = async (req, res) => {
    try {
        const validator = new UserValidator_1.UserValidator();
        const validationResult = validator.Registration({
            ...req.body
        });
        if (typeof validationResult === 'string') {
            throw new Error(validationResult);
        }
        const data = {
            id: (0, uuidv4_1.uuid)(),
            first_name: validationResult.first_name,
            last_name: validationResult.last_name,
            email: validationResult.email,
            password: await utils.bcryptHash(validationResult.password),
            phone_number: validationResult.phone_number,
            username: validationResult.username
        };
        const result = await query_1.UserQuery.CreateUser(data);
        const wallet = await query_1.WalletQuery.CreateWallet({
            id: (0, uuidv4_1.uuid)(),
            user_id: data.id,
            balance: 0,
        });
        console.log(wallet);
        return res.status(201).json({
            status: "success",
            data: result
        });
    }
    catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: error.message
        });
    }
};
UserController.login = async (req, res) => {
    try {
        const validator = new UserValidator_1.UserValidator();
        const validationResult = validator.Login({
            ...req.body
        });
        if (typeof validationResult === 'string') {
            throw new Error(validationResult);
        }
        const { email, password } = validationResult;
        const result = await query_1.UserQuery.GetUserByEmail(email);
        if (!result) {
            throw new Error("invalid login credentials");
        }
        const passwordIsValid = await utils.bcryptCompare(password, result.password);
        if (!passwordIsValid) {
            throw new Error("invalid login credentials");
        }
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const token = utils.generateToken(64);
        const data = {
            token: token,
            user_id: result.id,
            expires_at: date
        };
        const session = await query_1.SessionQuery.CreateSession(data);
        if (session !== "session stored successfully") {
            return res.status(400).json({
                status: "error",
                message: "Oops!!! something went wrong"
            });
        }
        return res.status(200).json({
            status: "success",
            data: {
                result,
                token: token,
                expires_at: date
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: error.message
        });
    }
};
UserController.getUsers = async (req, res) => {
    try {
        const result = await query_1.UserQuery.GetUsers();
        return res.status(200).json({
            status: "success",
            data: result
        });
    }
    catch (error) {
        return res.status(400).json({
            status: 'Error',
            message: error.message
        });
    }
};
