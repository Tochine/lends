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

    public static DebitWallet = async (req: AuthenticatedRequest, res: Response) => {
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
            const wallet = await WalletQuery.CreditWallet(result.id, data)
            if (wallet !== "successful") {
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

}