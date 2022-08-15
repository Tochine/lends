import Joi from "joi";

export interface CreditWalletProps {
    user_id: number,
    amount: number,
}



export class WalletValidator {
    CreditWallet(creditWalletProps: CreditWalletProps) {
        const creditWalletValidator = Joi.object<CreditWalletProps>({
            user_id: Joi.number().required(),
            amount: Joi.number().required()
        });
        const {error, value} = creditWalletValidator.validate(creditWalletProps)
        if(error){
            return error.message
        }
        return value;
    }
}