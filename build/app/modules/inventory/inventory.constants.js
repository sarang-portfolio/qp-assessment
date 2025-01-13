'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.INVENTORY_CONSTANTS = exports.QUANTITY_LIMIT = void 0;
const utility_1 = require('../../utility');
exports.QUANTITY_LIMIT = {
  LOWER_LIMIT: 0,
  UPPER_LIMIT: 1000,
};
exports.INVENTORY_CONSTANTS = {
  NOT_FOUND: new utility_1.MessageHandler(404, 'INVENTORY NOT FOUND'),
  INVALID_ACTION: new utility_1.MessageHandler(400, 'INVALID ACTION'),
  QUANTITY_TOO_LOW: new utility_1.MessageHandler(
    409,
    'QUANTITY CANNOT BE LESS THAN 0',
  ),
  QUANTITY_TOO_HIGH: new utility_1.MessageHandler(
    409,
    `QUANTITY CANNOT EXCEED ${exports.QUANTITY_LIMIT.UPPER_LIMIT}`,
  ),
  UPDATED: new utility_1.MessageHandler(200, 'INVENTORY UPDATED'),
  NOT_UPDATED: new utility_1.MessageHandler(409, 'INVENTORY NOT UPDATED'),
  INSUFFICIENT_INVENTORY: new utility_1.MessageHandler(
    409,
    'INSUFFICIENT INVENTORY',
  ),
};
//# sourceMappingURL=inventory.constants.js.map
