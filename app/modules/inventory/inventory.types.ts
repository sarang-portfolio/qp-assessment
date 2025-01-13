import {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface IInventory
  extends Model<
    InferAttributes<IInventory>,
    InferCreationAttributes<IInventory>
  > {
  id: CreationOptional<number>;
  quantity: number;
  groceryId: ForeignKey<number>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date | null>;
}

export interface UpdateInventoryDto {
  quantity: number;
  action: Action;
}

export enum Action {
  increment = "increment",
  decrement = "decrement",
  set = "set",
}
