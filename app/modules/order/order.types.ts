import {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface IOrder
  extends Model<InferAttributes<IOrder>, InferCreationAttributes<IOrder>> {
  id: CreationOptional<number>;
  userId: ForeignKey<number>;
  totalAmount: number;
  status: Status;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date | null>;
}

export enum Status {
  pending = "pending",
  completed = "completed",
  cancelled = "cancelled",
}

export interface CreateOrderDto {
  userId: number;
  totalAmount: number;
  status: Status;
}

export interface PlaceOrderDto {
  groceryId: number;
  quantity: number;
}

export interface ValidatePlaceOrder {
  items: {
    groceryId: number;
    quantity: number;
  }[];
}
