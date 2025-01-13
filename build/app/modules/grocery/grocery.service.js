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
const grocery_constants_1 = require('./grocery.constants');
const grocery_repo_1 = __importDefault(require('./grocery.repo'));
const createGrocery = (groceryDto) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const existingGrocery = yield getOneGrocery({ name: groceryDto.name });
      if (existingGrocery)
        throw grocery_constants_1.GROCERY_CONSTANTS.ALREADY_EXIST;
      yield grocery_repo_1.default.create(groceryDto);
      return grocery_constants_1.GROCERY_CONSTANTS.CREATED;
    } catch (error) {
      throw error;
    }
  });
const getAllGroceries = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const groceries = yield grocery_repo_1.default.getAll();
      return groceries.map((grocery) =>
        Object.assign(Object.assign({}, grocery), {
          outOfStock: grocery['inventory.quantity'] === 0,
        }),
      );
    } catch (error) {
      throw error;
    }
  });
const getOneGrocery = (groceryDto) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const grocery = yield grocery_repo_1.default.getOne(groceryDto);
      return grocery;
    } catch (error) {
      throw error;
    }
  });
const updateOneGrocery = (id, groceryDto) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const isUpdated = yield grocery_repo_1.default.updateOne(id, groceryDto);
      const [affectedCount] = isUpdated;
      if (affectedCount === 0)
        throw grocery_constants_1.GROCERY_CONSTANTS.NOT_UPDATED;
      return grocery_constants_1.GROCERY_CONSTANTS.UPDATED;
    } catch (error) {
      throw error;
    }
  });
const deleteOneGrocery = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const isDeleted = yield grocery_repo_1.default.deleteOne(id);
      if (!isDeleted) throw grocery_constants_1.GROCERY_CONSTANTS.NOT_DELETED;
      return grocery_constants_1.GROCERY_CONSTANTS.DELETED;
    } catch (error) {
      throw error;
    }
  });
const calculateTotalAmount = (items) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      let total = 0;
      for (const item of items) {
        const grocery = yield getOneGrocery({ id: item.groceryId });
        if (!grocery) throw `Grocery item with id ${item.groceryId} not found`;
        total += grocery.price * item.quantity;
      }
      return total;
    } catch (error) {
      throw error;
    }
  });
exports.default = {
  createGrocery,
  getAllGroceries,
  getOneGrocery,
  updateOneGrocery,
  deleteOneGrocery,
  calculateTotalAmount,
};
//# sourceMappingURL=grocery.service.js.map
