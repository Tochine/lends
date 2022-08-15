import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("wallets", function(table) {
        table.increments("id").primary();
        table.bigint("user_id").notNullable();
        table.decimal("amount", 15, 2).notNullable();
        table.timestamp
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("wallets");
}

