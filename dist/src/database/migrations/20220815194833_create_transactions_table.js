"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("transactions", function (table) {
        table.uuid("id").primary();
        table.uuid("user_id").notNullable();
        table.decimal("amount").notNullable();
        table.string("reference", 100).notNullable();
        table.enu("status", ["completed", "failed", "pending"]).defaultTo(null);
        table.enu("transaction_type", ["credit", "debit", "transfer"]).defaultTo(null);
        table.text("description");
        table.timestamp("updated_at").defaultTo(knex.fn.now());
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("transactions");
}
exports.down = down;
