import { roleModel } from "./roles.schema";
import { IRole } from "./roles.types";

const getOne = (role: Partial<IRole>): Promise<IRole | null> =>
  roleModel.findOne({ where: { ...role } });

export default {
  getOne,
};
