import { Request, Response } from 'express';
import * as UserQuery from "../query";
import { UserValidator }from "../validators/UserValidator";
import * as utils from "../utils";


export default class UserController {
    public static createUser = async (req: Request, res: Response) => {
        try {
            const validator = new UserValidator();
            const validationResult = validator.Registration({
                ...req.body
            });
            if (typeof validationResult === 'string') {
                throw new Error(validationResult as string)
            }
            const data = {
                first_name: validationResult.first_name,
                last_name: validationResult.last_name,
                email: validationResult.email,
                password: validationResult.password,
                phone_number: validationResult.phone_number
            }
            const result = await UserQuery.createAccount(data);
            return res.send({
                status: "success",
                data: result
            });
        } catch (error: any) {
            return res.status(400).json({
                status: 'Error',
                message: error.message
            });
        }
    }

}