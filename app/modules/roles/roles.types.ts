import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface IRole
  extends Model<InferAttributes<IRole>, InferCreationAttributes<IRole>> {
  id: CreationOptional<number>;
  name: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date | null>;
}
