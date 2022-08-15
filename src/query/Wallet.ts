import knex from "../database/connection";

interface Wallet {
  id: number;
  user_id: string;
  amount: string;
}

export async function CreditWallet (data: any){
  await knex<Wallet>("users").insert({...data});
  return "wallet credited successfully" 
}
