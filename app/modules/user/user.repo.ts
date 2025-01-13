import { userModel } from './user.schema';
import { CreateUserDto, IUser } from './user.types';

const create = (user: CreateUserDto): Promise<IUser> =>
  userModel.create({ ...user });

const getAll = (): Promise<IUser[]> => userModel.findAll();

const getOne = (user: Partial<IUser>): Promise<IUser | null> =>
  userModel.findOne({ where: { ...user } });

const updateOne = (
  id: number,
  user: Partial<IUser>,
): Promise<[affectedCount: number]> =>
  userModel.update(user, { where: { id } });

const deleteOne = (id: number): Promise<number> =>
  userModel.destroy({ where: { id } });

export default {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
