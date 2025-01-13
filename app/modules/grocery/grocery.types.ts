import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface IGrocery
  extends Model<InferAttributes<IGrocery>, InferCreationAttributes<IGrocery>> {
  id: CreationOptional<number>;
  name: string;
  description?: string | null;
  price: number;
  imageUrl: string;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date | null>;
}

export interface CreateGroceryDto {
  name: string;
  description?: string | null;
  price: number;
  imageUrl: string;
}

export interface GetAllGroceries extends IGrocery {
  quantity: number;
  outOfStock: boolean;
}
