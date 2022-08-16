import Joi from "joi";

export interface CreditWalletProps {
    user_id: string,
    amount: number,
}

export interface TransferWalletProps extends CreditWalletProps {
    email: string
}



export class WalletValidator {
    WalletRequest(creditWalletProps: CreditWalletProps) {
        const creditWalletValidator = Joi.object<CreditWalletProps>({
            user_id: Joi.string().required(),
            amount: Joi.number().required()
        });
        const {error, value} = creditWalletValidator.validate(creditWalletProps)
        if(error){
            return error.message
        }
        return value;
    }

    WalletTransferRequest(walletTransferProps: TransferWalletProps) {
        const creditWalletValidator = Joi.object<TransferWalletProps>({
            user_id: Joi.string().required(),
            amount: Joi.number().required(),
            email: Joi.string().normalize().email().required(),
        });
        const {error, value} = creditWalletValidator.validate(walletTransferProps)
        if(error){
            return error.message
        }
        return value;
    }
}