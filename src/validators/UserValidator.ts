import Joi from "joi";

export interface RegistrationProps {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    username: string;
    phone_number: string;
}

export class UserValidator {
    Registration(registerProps: RegistrationProps) {
        const registerValidator = Joi.object<RegistrationProps>({
            email: Joi.string().normalize().email().required(),
            first_name: Joi.string().min(3).required(),
            last_name: Joi.string().min(3).required(),
            password: Joi.string().min(4).required(),
            phone_number: Joi.string().min(11).required(),
            username: Joi.string().min(6)
        });
        const {error, value} = registerValidator.validate(registerProps)
        if(error){
            return error.message
        }
        return value;
    }
}