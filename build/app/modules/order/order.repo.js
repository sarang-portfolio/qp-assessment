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
Object.defineProperty(exports, '__esModule', { value: true });
const utility_1 = require('../../utility');
const grocery_schema_1 = require('../grocery/grocery.schema');
const orderItems_schema_1 = require('../orderItems/orderItems.schema');
const order_schema_1 = require('./order.schema');
const order_types_1 = require('./order.types');
const create = (userId, items, totalAmount) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield utility_1.sequelize.transaction();
    try {
      const newOrder = yield order_schema_1.orderModel.create(
        {
          userId,
          totalAmount,
          status: order_types_1.Status.pending,
        },
        { transaction },
      );
      const groceries = yield grocery_schema_1.groceryModel.findAll({
        where: {
          id: items.map((item) => item.groceryId),
        },
        attributes: ['id', 'price'],
      });
      const groceryMap = groceries.reduce((acc, grocery) => {
        acc[grocery.id] = grocery.price;
        return acc;
      }, {});
      const orderItems = items.map((item) => ({
        orderId: newOrder.id,
        groceryId: item.groceryId,
        quantity: item.quantity,
        price: groceryMap[item.groceryId],
      }));
      yield orderItems_schema_1.orderItemsModel.bulkCreate(orderItems, {
        transaction,
      });
      const inventoryUpdates = items.map((item) => ({
        groceryId: item.groceryId,
        quantity: item.quantity,
      }));
      const updatePromises = inventoryUpdates.map((update) =>
        utility_1.sequelize.query(
          `UPDATE "inventories" SET quantity = quantity - :quantity WHERE "groceryId" = :groceryId`,
          {
            replacements: {
              quantity: update.quantity,
              groceryId: update.groceryId,
            },
            transaction,
          },
        ),
      );
      yield Promise.all(updatePromises);
      yield transaction.commit();
      return newOrder;
    } catch (error) {
      yield transaction.rollback();
      throw error;
    }
  });
exports.default = {
  create,
};
//# sourceMappingURL=order.repo.js.map
