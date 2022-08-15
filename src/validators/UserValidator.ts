import Joi from "joi";

export interface LoginProps {
    email: string;
    password: string;
}

export interface RegistrationProps extends LoginProps{
    first_name: string;
    last_name: string;
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

    Login(loginProps: LoginProps) {
        const loginValidator = Joi.object<LoginProps>({
            email: Joi.string().normalize().email().required(),
            password: Joi.string().min(4).required(),
        });
        const {error, value} = loginValidator.validate(loginProps)
        if(error){
            return error.message
        }
        return value;
    }
}