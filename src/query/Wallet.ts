import knex from "../database/connection";

interface Wallet {
  id: string;
  user_id: string;
  balance: number;
}

export async function CreateWallet (data: any){
  await knex<Wallet>("wallets").insert({...data});
  return "wallet credited successfully" 
}

export async function CreditWallet (user_id: any, update: any){
  await knex<Wallet>("wallets").where("user_id", user_id).update(update);
  return "successful" 
}

export async function GetUserBalance(data: string) {
  return await knex<Wallet>("wallets").where("user_id", data).first<Wallet>();
}
