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
const grocery_constants_1 = require('../grocery/grocery.constants');
const grocery_service_1 = __importDefault(
  require('../grocery/grocery.service'),
);
const inventory_constants_1 = require('./inventory.constants');
const inventory_repo_1 = __importDefault(require('./inventory.repo'));
const inventory_types_1 = require('./inventory.types');
const getOneinventory = (inventoryDto) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const inventory = yield inventory_repo_1.default.getOne(inventoryDto);
      return inventory;
    } catch (error) {
      throw error;
    }
  });
const updateOneinventory = (groceryId, inventoryDto) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const groceryItem = yield grocery_service_1.default.getOneGrocery({
        id: groceryId,
      });
      if (!groceryItem) throw grocery_constants_1.GROCERY_CONSTANTS.NOT_FOUND;
      const inventory = yield getOneinventory({ id: groceryItem.id });
      if (!inventory) throw inventory_constants_1.INVENTORY_CONSTANTS.NOT_FOUND;
      let newQuantity = inventory.quantity;
      switch (inventoryDto.action) {
        case inventory_types_1.Action.increment:
          newQuantity += inventoryDto.quantity;
          break;
        case inventory_types_1.Action.decrement:
          newQuantity -= inventoryDto.quantity;
          break;
        case inventory_types_1.Action.set:
          newQuantity = inventoryDto.quantity;
          break;
        default:
          throw inventory_constants_1.INVENTORY_CONSTANTS.INVALID_ACTION;
      }
      if (newQuantity < inventory_constants_1.QUANTITY_LIMIT.LOWER_LIMIT) {
        throw inventory_constants_1.INVENTORY_CONSTANTS.QUANTITY_TOO_LOW;
      }
      if (newQuantity > inventory_constants_1.QUANTITY_LIMIT.UPPER_LIMIT) {
        throw inventory_constants_1.INVENTORY_CONSTANTS.QUANTITY_TOO_HIGH;
      }
      const isUpdated = yield inventory_repo_1.default.updateOne(inventory.id, {
        quantity: newQuantity,
      });
      const [affectedCount] = isUpdated;
      if (!affectedCount)
        throw inventory_constants_1.INVENTORY_CONSTANTS.NOT_UPDATED;
      return inventory_constants_1.INVENTORY_CONSTANTS.UPDATED;
    } catch (error) {
      throw error;
    }
  });
const checkInventory = (items) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      let details = [];
      let success = true;
      for (const item of items) {
        const inventory = yield getOneinventory({ groceryId: item.groceryId });
        if (!inventory || inventory.quantity < item.quantity) {
          success = false;
          details.push({
            groceryId: item.groceryId,
            available:
              (inventory === null || inventory === void 0
                ? void 0
                : inventory.quantity) || 0,
          });
        }
      }
      return { success, details };
    } catch (error) {
      throw error;
    }
  });
exports.default = {
  getOneinventory,
  updateOneinventory,
  checkInventory,
};
//# sourceMappingURL=inventory.service.js.map
