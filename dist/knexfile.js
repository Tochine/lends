"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// Database configuration
const config = {
    development: {
        client: "sqlite3",
        connection: {
            filename: path_1.default.join(__dirname, "./src/database/data/db.sqlite")
        },
        migrations: {
            tableName: "migrations",
            directory: path_1.default.join(__dirname, './src/database/migrations')
        },
        useNullAsDefault: true
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },
    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
exports.default = config;
