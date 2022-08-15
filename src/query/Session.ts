import knex from "../database/connection";

interface Session {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;

}

export async function CreateSession (data: any){
  await knex<Session>("sessions").insert({...data});
  return "session stored successfully" 
}

export async function GetSessionByToken(data: string) {
    return await knex<Session>("session").where("token", data).first<Session>()
  }
