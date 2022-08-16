"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("sessions", function (table) {
        table.uuid("id").primary();
        table.uuid("user_id").notNullable();
        table.string("token").notNullable();
        table.date("expires_at").notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("sessions");
}
exports.down = down;
