import { DataTypes, ModelStatic } from 'sequelize';
import { DATABASE_TABLES } from '../../common/constants/database.constants';
import { sequelize } from '../../utility';
import { roleModel } from '../roles/roles.schema';
import { IUser } from './user.types';

export const userModel: ModelStatic<IUser> = sequelize.define<IUser>(
  DATABASE_TABLES.USER,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['email'],
        unique: true,
      },
      {
        fields: ['roleId'],
      },
    ],
  },
);

roleModel.hasMany(userModel, {
  foreignKey: 'roleId',
  as: 'users',
});

userModel.belongsTo(roleModel, {
  foreignKey: 'roleId',
  as: 'role',
});
