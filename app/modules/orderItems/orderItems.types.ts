import {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface IOrderItems
  extends Model<
    InferAttributes<IOrderItems>,
    InferCreationAttributes<IOrderItems>
  > {
  id: CreationOptional<number>;
  orderId: ForeignKey<number>;
  groceryId: ForeignKey<number>;
  quantity: number;
  price: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date | null>;
}
