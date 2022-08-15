import knex from "../database/connection";
import { Request, Response } from "express"

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string
}

export async function CreateUser (data: any){
  await knex<User>("users").insert({...data});
  return "record stored successfully" 
}

export async function GetUsers () {
  return await knex('users').select()
}

export async function GetUserByEmail(data: string) {
  return await knex<User>("users").where("email", data).first<User>()
}