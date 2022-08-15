import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("sessions", function(table) {
        table.increments("id").primary();
        table.string("user_id").notNullable();
        table.string("token").notNullable();
        table.string("expires_at").notNullable();
        table.timestamp
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("sessions");
}

