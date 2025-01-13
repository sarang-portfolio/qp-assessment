'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.roleModel = void 0;
const sequelize_1 = require('sequelize');
const database_constants_1 = require('../../common/constants/database.constants');
const utility_1 = require('../../utility');
exports.roleModel = utility_1.sequelize.define(
  database_constants_1.DATABASE_TABLES.ROLE,
  {
    id: {
      type: sequelize_1.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  },
);
//# sourceMappingURL=roles.schema.js.map
