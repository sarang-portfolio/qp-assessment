'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.groceryModel = void 0;
const sequelize_1 = require('sequelize');
const database_constants_1 = require('../../common/constants/database.constants');
const utility_1 = require('../../utility');
exports.groceryModel = utility_1.sequelize.define(
  database_constants_1.DATABASE_TABLES.GROCERY,
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
    },
    description: {
      type: sequelize_1.DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: sequelize_1.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: sequelize_1.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['name', 'deletedAt'],
        unique: true,
      },
    ],
  },
);
//# sourceMappingURL=grocery.schema.js.map
