import type { Knex } from "knex";
import path from "path";

// Database configuration

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "./src/database/data/db.sqlite")
    },
    migrations: {
      tableName: "migrations",
      directory: path.join(__dirname, './src/database/migrations')
    },
    useNullAsDefault: true
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "./src/database/data/db.sqlite")
    },
    migrations: {
      tableName: "migrations",
      directory: path.join(__dirname, './src/database/migrations')
    },
    useNullAsDefault: true
  },

};

export default config;
