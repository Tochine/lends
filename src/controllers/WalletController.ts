import {  Response } from 'express';
import { uuid } from "uuidv4";
import _ from "lodash";
import  { UserQuery, TranxQuery, WalletQuery } from "../query";
import { WalletValidator }from "../validators/WalletValidator";
import * as utils from "../utils";
import { AuthenticatedRequest } from "../middleware";
import { TransactionType, TransactionStatus } from "../query/Enum";




export default class UserController {
    public static getUserBalance = async (req: AuthenticatedRequest, res: Response) => {

        const result = await WalletQuery.GetUserBalance(req.session.user_id);
        return res.status(200).json({
            status: "success",
            data: result
        });
    }

    public static creditWallet = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const validator = new WalletValidator();
            const validationResult = validator.WalletRequest({
                user_id: req.session.user_id,
                amount: req.body.amount
            });

            if (typeof validationResult === 'string') {
                throw new Error(validationResult as string)
            };    
            const result = await UserQuery.GetUserById(validationResult.user_id)
            console.log(result);
            if (!result) {
                return res.status(400).json({
                    status: "error",
                    message: "user not found"
                });
            }

            // Record transaction details
            let ref = await utils.generateRandomCode(8);

            const tranx = await TranxQuery.CreateTranx({
                id: uuid(),
                user_id: result.id,
                amount: validationResult.amount,
                reference: ref.toLocaleUpperCase(),
                transaction_type: TransactionType.CREDIT,
                status: TransactionStatus.COMPLETED
            })
            if (tranx !== "transaction created successfully") {
                return res.status(400).json({
                    status: "error",
                    message: "Transaction not commpleted"
                })
            }

            const currentBal = await WalletQuery.GetUserBalance(req.session.user_id);
            const updatedBal = currentBal.balance + validationResult.amount;

            const data = {
                balance: updatedBal
            }

            // update user wallet
            const wallet = await WalletQuery.CreditWallet(result.id, data)
            if (wallet !== "wallet credited successfully") {
                return res.status(400).json({
                    status: "error",
                    message: "Account not credited"
                })
            }

            return res.status(201).json({
                status: "success",
                data: {
                    user: _.omit(result, ["password", "created_at", "updated_at"]),
                    balance: data,
                }
            })
        } catch (error: any) {
            return res.status(400).json({
                status: 'Error',
                message: error.message
            });
        }
    }

    public static debitWallet = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const validator = new WalletValidator();
            const validationResult = validator.WalletRequest({
                user_id: req.session.user_id,
                amount: req.body.amount
            });


            if (typeof validationResult === 'string') {
                throw new Error(validationResult as string)
            };    
            const user = await UserQuery.GetUserById(validationResult.user_id)
            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "user not found"
                });
            }

            // Record transaction details
            let ref = await utils.generateRandomCode(8);

            const tranx = await TranxQuery.CreateTranx({
                id: uuid(),
                user_id: user.id,
                amount: validationResult.amount,
                reference: ref.toLocaleUpperCase(),
                transaction_type: TransactionType.DEBIT,
                status: TransactionStatus.COMPLETED
            })
            if (tranx !== "transaction created successfully") {
                return res.status(400).json({
                    status: "error",
                    message: "Transaction not commpleted"
                })
            }

            const currentBal = await WalletQuery.GetUserBalance(req.session.user_id);
            const updatedBal = currentBal.balance - validationResult.amount;

            const data = {
                balance: updatedBal
            }

            // update user wallet
            const wallet = await WalletQuery.CreditWallet(user.id, data)
            if (wallet !== "successful") {
                return res.status(400).json({
                    status: "error",
                    message: "Account not credited"
                })
            }

            return res.status(201).json({
                status: "success",
                data: {
                    user: _.omit(user, ["password", "created_at", "updated_at"]),
                    balance: data,
                }
            })
        } catch (error: any) {
            return res.status(400).json({
                status: 'Error',
                message: error.message
            });
        }
    }

    public static createTransfer = async (req: AuthenticatedRequest, res: Response) => {

        try {
            const validator = new WalletValidator();
            const validationResult = validator.WalletTransferRequest({
                user_id: req.session.user_id,
                amount: req.body.amount,
                email: req.body.email
            });

            console.log(validationResult)
    
    
            if (typeof validationResult === 'string') {
                throw new Error(validationResult as string)
            }; 
            
            const user = await UserQuery.GetUserById(req.session.user_id);
            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "user not found"
                });
            }

            const currentBal = await WalletQuery.GetUserBalance(user.id);
            if (currentBal.balance < validationResult.amount) {
                return res.status(400).json({
                    status: "success",
                    message: "balance not sufficient for this transaction"
                })
            }

            // get recipient record
            const recipient = await UserQuery.GetUserByEmail(validationResult.email);
            if (!recipient) {
                return res.status(400).json({
                    status: "success",
                    message: "recipient not found"
                })
            }

            // deduct amount from sender wallet
            const updatedBal = currentBal.balance - validationResult.amount;
            const data = {
                balance: updatedBal
            }
    
            // Record debit transaction details for sender
            let ref = await utils.generateRandomCode(8);
    
            const tranx = await TranxQuery.CreateTranx({
                id: uuid(),
                user_id: user.id,
                amount: validationResult.amount,
                reference: ref.toLocaleUpperCase(),
                transaction_type: TransactionType.TRANSFER,
                status: TransactionStatus.PENDING
            })
            if (tranx !== "transaction created successfully") {
                return res.status(400).json({
                    status: "error",
                    message: "Transaction not commpleted"
                })
            }

            // update sender wallet
            const wallet = await WalletQuery.CreditWallet(user.id, data)
            if (wallet !== "successful") {
                return res.status(400).json({
                    status: "error",
                    message: "Account not credited"
                })
            }

            // Record transfer transaction for recipient
            let t = await utils.generateRandomCode(8);

            const transfer = await TranxQuery.CreateTranx({
                id: uuid(),
                user_id: user.id,
                amount: validationResult.amount,
                reference: t.toLocaleUpperCase(),
                transaction_type: TransactionType.CREDIT,
                status: TransactionStatus.COMPLETED
            });
            if (transfer !== "transaction created successfully") {
                return res.status(400).json({
                    status: "error",
                    message: "Transaction not commpleted"
                })
            }
            // credit recipient wallet
            const recipientbal = await WalletQuery.GetUserBalance(recipient.id);
            const r = await WalletQuery.CreditWallet(recipient.id, {
                balance: recipientbal.balance + validationResult.amount
            })

            return res.status(201).json({
                status: "success",
                message: "transfer was successful",
                data: {
                    user: _.omit(user, ["password", "created_at", "updated_at"]),
                    balance: data,
                }
            })
        } catch (error: any) {
            return res.status(400).json({
                status: 'Error',
                message: error.message
            });
        }
        
    }

}