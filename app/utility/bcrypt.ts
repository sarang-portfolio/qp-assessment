import { compare, genSalt, hash } from 'bcryptjs';

export const createHash = async (password: string): Promise<string> => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await compare(password, hashedPassword);
};
