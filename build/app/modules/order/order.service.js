'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const grocery_service_1 = __importDefault(
  require('../grocery/grocery.service'),
);
const inventory_constants_1 = require('../inventory/inventory.constants');
const inventory_service_1 = __importDefault(
  require('../inventory/inventory.service'),
);
const order_constants_1 = require('./order.constants');
const order_repo_1 = __importDefault(require('./order.repo'));
const createOrder = (userId, items) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const totalAmount =
        yield grocery_service_1.default.calculateTotalAmount(items);
      const inventoryChecks =
        yield inventory_service_1.default.checkInventory(items);
      if (!inventoryChecks.success)
        throw inventory_constants_1.INVENTORY_CONSTANTS.INSUFFICIENT_INVENTORY;
      yield order_repo_1.default.create(userId, items, totalAmount);
      return order_constants_1.ORDER_CONSTANTS.CREATED;
    } catch (error) {
      throw error;
    }
  });
exports.default = {
  createOrder,
};
//# sourceMappingURL=order.service.js.map
