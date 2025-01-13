import userRepo from './user.repo';
import { CreateUserDto, IUser } from './user.types';

const createUser = async (userDto: CreateUserDto): Promise<IUser> => {
  try {
    const user = await userRepo.create(userDto);
    return user;
  } catch (error) {
    throw error;
  }
};

const getOneUser = async (userDto: Partial<IUser>): Promise<IUser | null> => {
  try {
    const user = await userRepo.getOne(userDto);
    return user;
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
  getOneUser,
};
