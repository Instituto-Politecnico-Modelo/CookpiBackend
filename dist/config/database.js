"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.connectWithRetry = connectWithRetry;
// src/database.ts
const sequelize_1 = require("sequelize");
const DB_NAME = process.env.MYSQLDATABASE || process.env.DB_NAME || "mysql";
const DB_USER = process.env.MYSQLUSER || process.env.DB_USER || "root";
const DB_PASS = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || "tekwvnuv2fy6kitc";
const DB_HOST = process.env.DBHOST || process.env.DB_HOST || "cookpi-db-xbyl0g";
const DB_PORT = Number(process.env.DBPORT || process.env.DB_PORT || 3306);
const DB_DIALECT = "mysql";
exports.sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASS, {
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
function connectWithRetry() {
    return __awaiter(this, arguments, void 0, function* (retries = 10, delayMs = 3000) {
        while (retries > 0) {
            try {
                yield exports.sequelize.authenticate();
                console.log("✔️ DB connected:", DB_HOST, DB_PORT, DB_NAME);
                return;
            }
            catch (err) {
                retries--;
                console.log(`DB connect failed (${retries} retries left). Waiting ${delayMs}ms...`);
                yield new Promise((r) => setTimeout(r, delayMs));
            }
        }
        throw new Error("Unable to connect to the database after retries.");
    });
}
exports.default = exports.sequelize;
//# sourceMappingURL=database.js.map