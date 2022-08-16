import { Request, Response, NextFunction } from "express";
import { SessionQuery } from "../query";
import { AuthenticatedRequest } from ".";

export default async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authorization = req.header("authorization") || "";
        const token = authorization.split(' ')[1];
        if (!token) {
            return res.status(400).json({
                status: "error",
                message: "not authenticated"
            });
        }

        const session = await SessionQuery.GetSessionByToken(token)
        // console.log(session)

        if (!session) {
            return res.status(400).json({
                status: "error",
                message: "invalid token"
            })
        }
        // const date = new Date(session.expires_at);
        // console.log(session.expires_at);
        // const currentDate = new Date();

        // if (currentDate.getTime() > date.getTime()) {
        //     return res.status(400).json({
        //         status: "error",
        //         message: "token has expired"
        //     });
        // }

        req.session = {
            user_id: session.user_id,
            token: session.token
        }
        return next();

    } catch (error: any) {
        return next(error)
    }
}