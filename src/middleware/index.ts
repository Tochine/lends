import { Request } from "express";

interface Session {
    user_id: string;
    token: string;
}
  
export interface AuthenticatedRequest extends Request {
    session: Session & any;
}