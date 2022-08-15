import { Request, Response } from 'express';
import  { UserQuery, SessionQuery } from "../query";
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
                password: await utils.bcryptHash(validationResult.password),
                phone_number: validationResult.phone_number,
                username: validationResult.username
            }
            const result = await UserQuery.CreateUser(data);
            return res.status(201).json({
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

    public static login = async (req: Request, res: Response) => {
        try {
            const validator = new UserValidator();
            const validationResult = validator.Login({
                ...req.body
            });

            if (typeof validationResult === 'string') {
                throw new Error(validationResult as string)
            }

            const { email, password } = validationResult
            const result = await UserQuery.GetUserByEmail(email);
            if (!result) {
                 throw new Error("invalid login credentials");
            }
     
            const passwordIsValid = await utils.bcryptCompare(password, result.password);
            if (!passwordIsValid) {
             throw new Error("invalid login credentials");
            }

            const date = new Date();
            date.setDate(date.getDate() + 1);
     
            const token = utils.generateToken(64);
            const data = {
                token: token,
                user_id: result.id,
                expires_at: date
            }
            let session = await SessionQuery.CreateSession(data)
            if (session !== "session stored successfully") {
                return res.status(400).json({
                    status: "error",
                    message: "Oops!!! something went wrong"
                })
            }
     
            return res.status(200).json({
                status: "success",
                data: {
                    result,
                    token: token
                }
            })
        } catch (error: any) {
            return res.status(400).json({
                status: 'Error',
                message: error.message
            });
        }

    }

    public static getUsers = async (req: Request, res: Response) => {
        try {
            const result = await UserQuery.GetUsers();

            return res.status(200).json({
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