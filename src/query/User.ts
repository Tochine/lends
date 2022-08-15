import knex from "../database/connection";
import { Request, Response } from "express"

export default async (data: any) => {
    interface User {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        username: string
      }

  await knex<User>("users").insert({...data});
  return "record stored successfully"

    
}