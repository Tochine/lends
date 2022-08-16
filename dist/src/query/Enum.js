"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.TransactionType = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["CREDIT"] = "credit";
    TransactionType["DEBIT"] = "debit";
    TransactionType["TRANSFER"] = "transfer";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["COMPLETED"] = "completed";
    TransactionStatus["FAILED"] = "failed";
    TransactionStatus["PENDING"] = "pending";
    TransactionStatus["REVERSAL"] = "reversal";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
