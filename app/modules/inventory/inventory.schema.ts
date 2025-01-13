import { DataTypes, ModelStatic } from "sequelize";
import { DATABASE_TABLES } from "../../common/constants/database.constants";
import { sequelize } from "../../utility";
import { groceryModel } from "../grocery/grocery.schema";
import { IInventory } from "./inventory.types";

export const inventoryModel: ModelStatic<IInventory> =
  sequelize.define<IInventory>(
    DATABASE_TABLES.INVENTORY,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
          fields: ["groceryId"],
        },
      ],
    }
  );

groceryModel.hasOne(inventoryModel, {
  foreignKey: "groceryId",
});

inventoryModel.belongsTo(groceryModel, {
  foreignKey: "groceryId",
});
