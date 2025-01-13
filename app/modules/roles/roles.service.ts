import rolesRepo from "./roles.repo";
import { IRole } from "./roles.types";

const getOneRole = async (roleDto: Partial<IRole>): Promise<IRole | null> => {
  try {
    const role = await rolesRepo.getOne(roleDto);
    return role;
  } catch (error) {
    throw error;
  }
};

export default {
  getOneRole,
};
