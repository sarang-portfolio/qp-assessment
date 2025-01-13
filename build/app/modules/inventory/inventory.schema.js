'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.inventoryModel = void 0;
const sequelize_1 = require('sequelize');
const database_constants_1 = require('../../common/constants/database.constants');
const utility_1 = require('../../utility');
const grocery_schema_1 = require('../grocery/grocery.schema');
exports.inventoryModel = utility_1.sequelize.define(
  database_constants_1.DATABASE_TABLES.INVENTORY,
  {
    id: {
      type: sequelize_1.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: sequelize_1.DataTypes.INTEGER,
      allowNull: false,
    },
    groceryId: {
      type: sequelize_1.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: grocery_schema_1.groceryModel,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['groceryId'],
      },
    ],
  },
);
grocery_schema_1.groceryModel.hasOne(exports.inventoryModel, {
  foreignKey: 'groceryId',
});
exports.inventoryModel.belongsTo(grocery_schema_1.groceryModel, {
  foreignKey: 'groceryId',
});
//# sourceMappingURL=inventory.schema.js.map
