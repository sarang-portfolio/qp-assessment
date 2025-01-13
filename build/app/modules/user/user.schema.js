"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const sequelize_1 = require("sequelize");
const database_constants_1 = require("../../common/constants/database.constants");
const utility_1 = require("../../utility");
const roles_schema_1 = require("../roles/roles.schema");
exports.userModel = utility_1.sequelize.define(database_constants_1.DATABASE_TABLES.USER, {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id',
        },
    },
}, {
    timestamps: true,
    paranoid: true,
    indexes: [
        {
            fields: ['email'],
            unique: true,
        },
        {
            fields: ['roleId'],
        },
    ],
});
roles_schema_1.roleModel.hasMany(exports.userModel, {
    foreignKey: 'roleId',
    as: 'users',
});
exports.userModel.belongsTo(roles_schema_1.roleModel, {
    foreignKey: 'roleId',
    as: 'role',
});
//# sourceMappingURL=user.schema.js.map