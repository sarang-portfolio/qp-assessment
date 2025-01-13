"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const pg_1 = __importDefault(require("pg"));
const sequelize_1 = require("sequelize");
const { DATABASE, HOST, DB_PORT, DB_USER, DB_PASSWORD, DIALECT } = process.env;
exports.sequelize = new sequelize_1.Sequelize(DATABASE, DB_USER, DB_PASSWORD, {
    host: HOST,
    port: Number(DB_PORT),
    dialect: DIALECT || 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    dialectModule: pg_1.default,
    pool: {
        max: 10,
        min: 0,
        idle: 10000,
        acquire: 30000,
    },
});
//# sourceMappingURL=sequelize.js.map