"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
const config = {
    env: {
        isDevelopment: process.env.NODE_ENV || "development"
    },
    app: {
        secret: process.env.SESSION_SECRET || "@HEll01234",
        bcrypt_rounds: 10
    }
};
exports.default = config;
