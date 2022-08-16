"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("users", function (table) {
        table.uuid("id").primary();
        table.string("first_name", 100).notNullable();
        table.string("last_name", 100).notNullable();
        table.string("email", 100).unique();
        table.string("password", 255).notNullable();
        table.string("username", 100).unique();
        table.string("phone_number", 50).notNullable();
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("users");
}
exports.down = down;
