import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", function(table) {
        table.increments("id").primary();
        table.bigint("user_id").notNullable();
        table.decimal("amount").notNullable();
        table.string("reference", 100).notNullable();
        table.enu("status", ["completed", "failed", "pending"]).defaultTo(null);
        table.enu("transaction_type", ["credit", "debit", "transfer"]).defaultTo(null);;
        table.text("decription");
        table.timestamp
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transactions");
}
