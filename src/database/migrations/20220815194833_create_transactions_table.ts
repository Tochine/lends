import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", function(table) {
        table.uuid("id").primary();
        table.uuid("user_id").notNullable();
        table.decimal("amount").notNullable();
        table.string("reference", 100).notNullable();
        table.enu("status", ["completed", "failed", "pending"]).defaultTo(null);
        table.enu("transaction_type", ["credit", "debit", "transfer"]).defaultTo(null);;
        table.text("description");
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("transactions");
}
