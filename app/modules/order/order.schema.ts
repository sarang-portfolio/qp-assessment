import { DataTypes, ModelStatic } from 'sequelize';
import { DATABASE_TABLES } from '../../common/constants/database.constants';
import { sequelize } from '../../utility';
import { userModel } from '../user/user.schema';
import { IOrder, Status } from './order.types';

export const orderModel: ModelStatic<IOrder> = sequelize.define<IOrder>(
  DATABASE_TABLES.ORDER,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(Status)),
      allowNull: false,
      defaultValue: Status.pending,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: userModel,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['status'],
      },
      {
        fields: ['userId', 'status'],
      },
    ],
  },
);

userModel.hasMany(orderModel, { foreignKey: 'userId' });
orderModel.belongsTo(userModel, { foreignKey: 'userId' });
