import { Request, Response } from 'express';
import  { UserQuery, TranxQuery, WalletQuery } from "../query";
import { WalletValidator }from "../validators/WalletValidator";
import * as utils from "../utils";
import { AuthenticatedRequest } from "../middleware";
import { TransactionType, TransactionStatus } from "../query/Enum";


export default class UserController {
    public static creditWallet = async (req: AuthenticatedRequest, res: Response) => {
        try {
            const validator = new WalletValidator();
            const validationResult = validator.CreditWallet({
                user_id: req.session.user.id,
                ...req.body
            });
            if (typeof validationResult === 'string') {
                throw new Error(validationResult as string)
            }
           ;
            const result = await UserQuery.GetUserById(validationResult.user_id)
            if (!result) {
                return res.status(400).json({
                    status: "error",
                    message: "user not found"
                });
            }
            const data = {
                user_id: result.id,
                amount: validationResult.amount
            }
            await WalletQuery.CreditWallet(data)

            // Record transaction details
            const ref = utils.generateRandomCode(8);

            const tranx = await TranxQuery.CreateTranx({
                user_id: result.id,
                amount: validationResult.amount,
                reference: ref.toLocaleUpperCase(),
                transaction_type: TransactionType.CREDIT,
                status: TransactionStatus.COMPLETED
            })
            if (tranx === "transaction created successfully") {
                return res.status(400).json({
                    status: "error",
                    message: "Transaction not commpleted"
                })
            }
            return res.status(201).json({
                status: "success",
                data: data
            })
        } catch (error: any) {
            return res.status(400).json({
                status: 'Error',
                message: error.message
            });
        }
    }
}