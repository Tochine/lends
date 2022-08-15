import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", function(table) {
        table.increments("id").primary();
        table.string("first_name", 100).notNullable();
        table.string("last_name", 100).notNullable();
        table.string("email", 100).unique();
        table.string("password", 255).notNullable();
        table.string("username", 100).unique();
        table.string("phone_number", 50).notNullable();
        table.timestamp
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("users");
}

