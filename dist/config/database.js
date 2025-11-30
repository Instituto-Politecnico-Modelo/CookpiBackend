"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/database.ts
const sequelize_1 = require("sequelize");
/*
const DB_NAME = process.env.MYSQLDATABASE || process.env.DB_NAME || "mysql";
const DB_USER = process.env.MYSQLUSER || process.env.DB_USER || "root";
const DB_PASS = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "1cb8cisrdjocflak";
const DB_HOST = process.env.DBHOST || process.env.DB_HOST || "cookpi-db-yu9xqc";
const DB_PORT = Number(process.env.DBPORT || process.env.DB_PORT || 3306);
const DB_DIALECT = "mysql";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
});


export async function connectWithRetry(retries = 10, delayMs = 3000) {
  while (retries > 0) {
    try {
      await sequelize.authenticate();
      console.log("✔️ DB connected:", DB_HOST, DB_PORT, DB_NAME);
      return;
    } catch (err) {
      retries--;
      console.log(
        `DB connect failed (${retries} retries left). Waiting ${delayMs}ms...`
      );
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error("Unable to connect to the database after retries.");
}
*/
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false,
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map