import { DataTypes, ModelStatic } from "sequelize";
import { DATABASE_TABLES } from "../../common/constants/database.constants";
import { sequelize } from "../../utility";
import { groceryModel } from "../grocery/grocery.schema";
import { orderModel } from "../order/order.schema";
import { IOrderItems } from "./orderItems.types";

export const orderItemsModel: ModelStatic<IOrderItems> =
  sequelize.define<IOrderItems>(
    DATABASE_TABLES.ORDER_ITEM,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: orderModel,
          key: "id",
        },
      },
      groceryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: groceryModel,
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          fields: ["orderId"],
        },
        {
          fields: ["groceryId"],
        },
        {
          fields: ["orderId", "groceryId"],
          unique: true,
        },
      ],
    }
  );

orderModel.hasMany(orderItemsModel, { foreignKey: "orderId" });
orderItemsModel.belongsTo(orderModel, { foreignKey: "orderId" });

orderItemsModel.belongsTo(groceryModel, { foreignKey: "groceryId" });
groceryModel.hasMany(orderItemsModel, { foreignKey: "groceryId" });
