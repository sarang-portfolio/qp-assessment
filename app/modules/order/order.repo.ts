import { sequelize } from "../../utility";
import { groceryModel } from "../grocery/grocery.schema";
import { orderItemsModel } from "../orderItems/orderItems.schema";
import { orderModel } from "./order.schema";
import { IOrder, PlaceOrderDto, Status } from "./order.types";

const create = async (
  userId: number,
  items: PlaceOrderDto[],
  totalAmount: number
): Promise<IOrder> => {
  const transaction = await sequelize.transaction();
  try {
    const newOrder = await orderModel.create(
      {
        userId,
        totalAmount,
        status: Status.pending,
      },
      { transaction }
    );

    const groceries = await groceryModel.findAll({
      where: {
        id: items.map((item) => item.groceryId),
      },
      attributes: ["id", "price"],
    });

    const groceryMap = groceries.reduce((acc, grocery) => {
      acc[grocery.id] = grocery.price;
      return acc;
    }, {} as Record<number, number>);

    const orderItems = items.map((item) => ({
      orderId: newOrder.id,
      groceryId: item.groceryId,
      quantity: item.quantity,
      price: groceryMap[item.groceryId],
    }));

    await orderItemsModel.bulkCreate(orderItems, { transaction });

    const inventoryUpdates = items.map((item) => ({
      groceryId: item.groceryId,
      quantity: item.quantity,
    }));

    const updatePromises = inventoryUpdates.map((update) =>
      sequelize.query(
        `UPDATE "inventories" SET quantity = quantity - :quantity WHERE "groceryId" = :groceryId`,
        {
          replacements: {
            quantity: update.quantity,
            groceryId: update.groceryId,
          },
          transaction,
        }
      )
    );

    await Promise.all(updatePromises);

    await transaction.commit();
    return newOrder;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default {
  create,
};
