'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.orderModel = void 0;
const sequelize_1 = require('sequelize');
const database_constants_1 = require('../../common/constants/database.constants');
const utility_1 = require('../../utility');
const user_schema_1 = require('../user/user.schema');
const order_types_1 = require('./order.types');
exports.orderModel = utility_1.sequelize.define(
  database_constants_1.DATABASE_TABLES.ORDER,
  {
    id: {
      type: sequelize_1.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    totalAmount: {
      type: sequelize_1.DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: sequelize_1.DataTypes.ENUM(...Object.values(order_types_1.Status)),
      allowNull: false,
      defaultValue: order_types_1.Status.pending,
    },
    userId: {
      type: sequelize_1.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: user_schema_1.userModel,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['userId', 'status'],
      },
    ],
  },
);
user_schema_1.userModel.hasMany(exports.orderModel, { foreignKey: 'userId' });
exports.orderModel.belongsTo(user_schema_1.userModel, { foreignKey: 'userId' });
//# sourceMappingURL=order.schema.js.map
