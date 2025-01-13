import { MessageHandler } from "../../utility";

export const QUANTITY_LIMIT = {
  LOWER_LIMIT: 0,
  UPPER_LIMIT: 1000,
};

export const INVENTORY_CONSTANTS = {
  NOT_FOUND: new MessageHandler(404, "INVENTORY NOT FOUND"),
  INVALID_ACTION: new MessageHandler(400, "INVALID ACTION"),
  QUANTITY_TOO_LOW: new MessageHandler(409, "QUANTITY CANNOT BE LESS THAN 0"),
  QUANTITY_TOO_HIGH: new MessageHandler(
    409,
    `QUANTITY CANNOT EXCEED ${QUANTITY_LIMIT.UPPER_LIMIT}`
  ),
  UPDATED: new MessageHandler(200, "INVENTORY UPDATED"),
  NOT_UPDATED: new MessageHandler(409, "INVENTORY NOT UPDATED"),
  INSUFFICIENT_INVENTORY: new MessageHandler(409, "INSUFFICIENT INVENTORY"),
};
