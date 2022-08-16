"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletValidator = void 0;
const joi_1 = __importDefault(require("joi"));
class WalletValidator {
    WalletRequest(creditWalletProps) {
        const creditWalletValidator = joi_1.default.object({
            user_id: joi_1.default.string().required(),
            amount: joi_1.default.number().required()
        });
        const { error, value } = creditWalletValidator.validate(creditWalletProps);
        if (error) {
            return error.message;
        }
        return value;
    }
    WalletTransferRequest(walletTransferProps) {
        const creditWalletValidator = joi_1.default.object({
            user_id: joi_1.default.string().required(),
            amount: joi_1.default.number().required(),
            email: joi_1.default.string().normalize().email().required(),
        });
        const { error, value } = creditWalletValidator.validate(walletTransferProps);
        if (error) {
            return error.message;
        }
        return value;
    }
}
exports.WalletValidator = WalletValidator;
