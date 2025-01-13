import { createToken } from '../../common';
import { MessageHandler } from '../../utility';
import { comparePassword, createHash } from '../../utility/bcrypt';
import rolesService from '../roles/roles.service';
import { IRole } from '../roles/roles.types';
import { USER_CONSTANTS } from '../user/user.constants';
import userService from '../user/user.service';
import { IUser } from '../user/user.types';
import { AUTH_CONSTANTS } from './auth.constants';
import { LoginDto, SignUpDto } from './auth.types';

const signUp = async (signUpDto: SignUpDto): Promise<MessageHandler> => {
  try {
    const existingUser: IUser | null = await userService.getOneUser({
      email: signUpDto.email,
    });
    if (existingUser) {
      throw USER_CONSTANTS.EXISTS;
    }
    let role: IRole | null = signUpDto.role
      ? await rolesService.getOneRole({ name: signUpDto.role })
      : await rolesService.getOneRole({ name: 'User' });
    const { password, ...restUserDto } = signUpDto;
    const hashedPassword: string = await createHash(password);
    await userService.createUser({
      password: hashedPassword,
      roleId: Number(role?.id), // default set to 'User'
      ...restUserDto,
    });
    return USER_CONSTANTS.CREATED;
  } catch (error) {
    throw error;
  }
};

const login = async (loginDto: LoginDto): Promise<{ token: string }> => {
  try {
    const user: IUser | null = await userService.getOneUser({
      email: loginDto.email,
    });
    if (!user) {
      throw USER_CONSTANTS.NOT_FOUND;
    }
    const isPasswordCorrect: boolean = await comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw AUTH_CONSTANTS.INVALID_CREDENTIALS;
    }
    const payload = {
      userId: user.id,
      role: user.roleId,
    };
    const token: string = createToken(payload);
    return { token };
  } catch (error) {
    throw error;
  }
};

export default {
  signUp,
  login,
};
