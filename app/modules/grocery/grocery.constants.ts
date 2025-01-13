import { MessageHandler } from "../../utility";

export const GROCERY_CONSTANTS = {
  NOT_FOUND: new MessageHandler(404, "GROCERY ITEM NOT FOUND"),
  CREATED: new MessageHandler(201, "GROCERY CREATED"),
  ALREADY_EXIST: new MessageHandler(400, "GROCERY ALREADY EXISTS"),
  UPDATED: new MessageHandler(200, "GROCERY UPDATED"),
  NOT_UPDATED: new MessageHandler(409, "GROCERY NOT UPDATED"),
  DELETED: new MessageHandler(200, "GROCERY DELETED"),
  NOT_DELETED: new MessageHandler(409, "GROCERY NOT DELETED"),
};
