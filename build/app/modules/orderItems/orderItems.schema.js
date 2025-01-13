"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemsModel = void 0;
const sequelize_1 = require("sequelize");
const database_constants_1 = require("../../common/constants/database.constants");
const utility_1 = require("../../utility");
const grocery_schema_1 = require("../grocery/grocery.schema");
const order_schema_1 = require("../order/order.schema");
exports.orderItemsModel = utility_1.sequelize.define(database_constants_1.DATABASE_TABLES.ORDER_ITEM, {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    orderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: order_schema_1.orderModel,
            key: 'id',
        },
    },
    groceryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: grocery_schema_1.groceryModel,
            key: 'id',
        },
    },
}, {
    timestamps: true,
    paranoid: true,
    indexes: [
        {
            fields: ['orderId'],
        },
        {
            fields: ['groceryId'],
        },
        {
            fields: ['orderId', 'groceryId'],
            unique: true,
        },
    ],
});
order_schema_1.orderModel.hasMany(exports.orderItemsModel, { foreignKey: 'orderId' });
exports.orderItemsModel.belongsTo(order_schema_1.orderModel, { foreignKey: 'orderId' });
exports.orderItemsModel.belongsTo(grocery_schema_1.groceryModel, { foreignKey: 'groceryId' });
grocery_schema_1.groceryModel.hasMany(exports.orderItemsModel, { foreignKey: 'groceryId' });
//# sourceMappingURL=orderItems.schema.js.map