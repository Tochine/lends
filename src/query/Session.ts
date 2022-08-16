import knex from "../database/connection";

interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;

}

export async function CreateSession (data: any){
  await knex<Session>("sessions").insert({...data});
  return "session stored successfully" 
}

export async function GetSessionByToken(data: string) {
    return await knex<Session>("sessions").where("token", data).first<Session>()
  }
