import { DataTypes, ModelStatic } from 'sequelize';
import { DATABASE_TABLES } from '../../common/constants/database.constants';
import { sequelize } from '../../utility';
import { IGrocery } from './grocery.types';

export const groceryModel: ModelStatic<IGrocery> = sequelize.define<IGrocery>(
  DATABASE_TABLES.GROCERY,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['name', 'deletedAt'],
        unique: true,
      },
    ],
  },
);
