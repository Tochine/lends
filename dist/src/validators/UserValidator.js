"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class UserValidator {
    Registration(registerProps) {
        const registerValidator = joi_1.default.object({
            email: joi_1.default.string().normalize().email().required(),
            first_name: joi_1.default.string().min(3).required(),
            last_name: joi_1.default.string().min(3).required(),
            password: joi_1.default.string().min(4).required(),
            phone_number: joi_1.default.string().min(11).required(),
            username: joi_1.default.string().min(6)
        });
        const { error, value } = registerValidator.validate(registerProps);
        if (error) {
            return error.message;
        }
        return value;
    }
    Login(loginProps) {
        const loginValidator = joi_1.default.object({
            email: joi_1.default.string().normalize().email().required(),
            password: joi_1.default.string().min(4).required(),
        });
        const { error, value } = loginValidator.validate(loginProps);
        if (error) {
            return error.message;
        }
        return value;
    }
}
exports.UserValidator = UserValidator;
