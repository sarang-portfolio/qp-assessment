import { BASE_EXCEPTION_CONSTANTS, SUCCESS_MESSAGES } from "../common";
import { sequelize } from "../utility";

export const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(SUCCESS_MESSAGES.DATABASE_CONNECTED);
    return true;
  } catch (e) {
    throw BASE_EXCEPTION_CONSTANTS.DATABASE_FAILURE;
  }
};
