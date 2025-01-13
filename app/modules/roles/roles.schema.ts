import { DataTypes, ModelStatic } from 'sequelize';
import { DATABASE_TABLES } from '../../common/constants/database.constants';
import { sequelize } from '../../utility';
import { IRole } from './roles.types';

export const roleModel: ModelStatic<IRole> = sequelize.define<IRole>(
  DATABASE_TABLES.ROLE,
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
      unique: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  },
);
