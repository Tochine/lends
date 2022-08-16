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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const lodash_1 = __importDefault(require("lodash"));
const query_1 = require("../query");
const WalletValidator_1 = require("../validators/WalletValidator");
const utils = __importStar(require("../utils"));
const Enum_1 = require("../query/Enum");
class UserController {
}
exports.default = UserController;
_a = UserController;
UserController.getUserBalance = async (req, res) => {
    const result = await query_1.WalletQuery.GetUserBalance(req.session.user_id);
    return res.status(200).json({
        status: "success",
        data: result
    });
};
UserController.creditWallet = async (req, res) => {
    try {
        const validator = new WalletValidator_1.WalletValidator();
        const validationResult = validator.WalletRequest({
            user_id: req.session.user_id,
            amount: req.body.amount
        });
        if (typeof validationResult === 'string') {
            throw new Error(validationResult);
        }
        ;
        const result = await query_1.UserQuery.GetUserById(validationResult.user_id);
        console.log(result);
        if (!result) {
            return res.status(400).json({
                status: "error",
                message: "user not found"
            });
        }
        // Record transaction details
        let ref = await utils.generateRandomCode(8);
        const tranx = await query_1.TranxQuery.CreateTranx({
            id: (0, uuidv4_1.uuid)(),
            user_id: result.id,
            amount: validationResult.amount,
            reference: ref.toLocaleUpperCase(),
            transaction_type: Enum_1.TransactionType.CREDIT,
            status: Enum_1.TransactionStatus.COMPLETED
        });
        if (tranx !== "transaction created successfully") {
            return res.status(400).json({
                status: "error",
                message: "Transaction not commpleted"
            });
        }
        const currentBal = await query_1.WalletQuery.GetUserBalance(req.session.user_id);
        const updatedBal = currentBal.balance + validationResult.amount;
        const data = {
            balance: updatedBal
        };
        // update user wallet
        const wallet = await query_1.WalletQuery.CreditWallet(result.id, data);
        if (wallet !== "wallet credited successfully") {
            return res.status(400).json({
                status: "error",
                message: "Account not credited"
            });
        }
        return res.status(201).json({
            status: "success",
            data: {
                user: lodash_1.default.omit(result, ["password", "created_at", "updated_at"]),
                balance: data,
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
UserController.debitWallet = async (req, res) => {
    try {
        const validator = new WalletValidator_1.WalletValidator();
        const validationResult = validator.WalletRequest({
            user_id: req.session.user_id,
            amount: req.body.amount
        });
        if (typeof validationResult === 'string') {
            throw new Error(validationResult);
        }
        ;
        const user = await query_1.UserQuery.GetUserById(validationResult.user_id);
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "user not found"
            });
        }
        // Record transaction details
        let ref = await utils.generateRandomCode(8);
        const tranx = await query_1.TranxQuery.CreateTranx({
            id: (0, uuidv4_1.uuid)(),
            user_id: user.id,
            amount: validationResult.amount,
            reference: ref.toLocaleUpperCase(),
            transaction_type: Enum_1.TransactionType.DEBIT,
            status: Enum_1.TransactionStatus.COMPLETED
        });
        if (tranx !== "transaction created successfully") {
            return res.status(400).json({
                status: "error",
                message: "Transaction not commpleted"
            });
        }
        const currentBal = await query_1.WalletQuery.GetUserBalance(req.session.user_id);
        const updatedBal = currentBal.balance - validationResult.amount;
        const data = {
            balance: updatedBal
        };
        // update user wallet
        const wallet = await query_1.WalletQuery.CreditWallet(user.id, data);
        if (wallet !== "successful") {
            return res.status(400).json({
                status: "error",
                message: "Account not credited"
            });
        }
        return res.status(201).json({
            status: "success",
            data: {
                user: lodash_1.default.omit(user, ["password", "created_at", "updated_at"]),
                balance: data,
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
UserController.createTransfer = async (req, res) => {
    try {
        const validator = new WalletValidator_1.WalletValidator();
        const validationResult = validator.WalletTransferRequest({
            user_id: req.session.user_id,
            amount: req.body.amount,
            email: req.body.email
        });
        console.log(validationResult);
        if (typeof validationResult === 'string') {
            throw new Error(validationResult);
        }
        ;
        const user = await query_1.UserQuery.GetUserById(req.session.user_id);
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "user not found"
            });
        }
        const currentBal = await query_1.WalletQuery.GetUserBalance(user.id);
        if (currentBal.balance < validationResult.amount) {
            return res.status(400).json({
                status: "success",
                message: "balance not sufficient for this transaction"
            });
        }
        // get recipient record
        const recipient = await query_1.UserQuery.GetUserByEmail(validationResult.email);
        if (!recipient) {
            return res.status(400).json({
                status: "success",
                message: "recipient not found"
            });
        }
        // deduct amount from sender wallet
        const updatedBal = currentBal.balance - validationResult.amount;
        const data = {
            balance: updatedBal
        };
        // Record debit transaction details for sender
        let ref = await utils.generateRandomCode(8);
        const tranx = await query_1.TranxQuery.CreateTranx({
            id: (0, uuidv4_1.uuid)(),
            user_id: user.id,
            amount: validationResult.amount,
            reference: ref.toLocaleUpperCase(),
            transaction_type: Enum_1.TransactionType.TRANSFER,
            status: Enum_1.TransactionStatus.PENDING
        });
        if (tranx !== "transaction created successfully") {
            return res.status(400).json({
                status: "error",
                message: "Transaction not commpleted"
            });
        }
        // update sender wallet
        const wallet = await query_1.WalletQuery.CreditWallet(user.id, data);
        if (wallet !== "successful") {
            return res.status(400).json({
                status: "error",
                message: "Account not credited"
            });
        }
        // Record transfer transaction for recipient
        let t = await utils.generateRandomCode(8);
        const transfer = await query_1.TranxQuery.CreateTranx({
            id: (0, uuidv4_1.uuid)(),
            user_id: user.id,
            amount: validationResult.amount,
            reference: t.toLocaleUpperCase(),
            transaction_type: Enum_1.TransactionType.CREDIT,
            status: Enum_1.TransactionStatus.COMPLETED
        });
        if (transfer !== "transaction created successfully") {
            return res.status(400).json({
                status: "error",
                message: "Transaction not commpleted"
            });
        }
        // credit recipient wallet
        const recipientbal = await query_1.WalletQuery.GetUserBalance(recipient.id);
        const r = await query_1.WalletQuery.CreditWallet(recipient.id, {
            balance: recipientbal.balance + validationResult.amount
        });
        return res.status(201).json({
            status: "success",
            message: "transfer was successful",
            data: {
                user: lodash_1.default.omit(user, ["password", "created_at", "updated_at"]),
                balance: data,
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
