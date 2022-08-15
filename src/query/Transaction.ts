import knex from "../database/connection";
import { TransactionType, TransactionStatus } from "./Enum";

interface Tranx {
  id: number;
  user_id: string;
  amount: number;
  reference: string;
  transaction_type: TransactionType | null;
  status: TransactionStatus | null;
  description: string

}

export async function CreateTranx (data: any){
  await knex<Tranx>("transaction").insert({...data});
  return "transaction created successfully" 
}