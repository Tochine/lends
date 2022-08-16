import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("sessions", function(table) {
        table.uuid("id").primary();
        table.uuid("user_id").notNullable();
        table.string("token").notNullable();
        table.date("expires_at").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("sessions");
}

