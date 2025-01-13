import { MessageHandler } from "../../utility";
import groceryService from "../grocery/grocery.service";
import { INVENTORY_CONSTANTS } from "../inventory/inventory.constants";
import inventoryService from "../inventory/inventory.service";
import { ORDER_CONSTANTS } from "./order.constants";
import orderRepo from "./order.repo";
import { PlaceOrderDto } from "./order.types";

const createOrder = async (
  userId: number,
  items: PlaceOrderDto[]
): Promise<MessageHandler> => {
  try {
    const totalAmount: number = await groceryService.calculateTotalAmount(
      items
    );
    const inventoryChecks = await inventoryService.checkInventory(items);
    if (!inventoryChecks.success)
      throw INVENTORY_CONSTANTS.INSUFFICIENT_INVENTORY;
    await orderRepo.create(userId, items, totalAmount);
    return ORDER_CONSTANTS.CREATED;
  } catch (error) {
    throw error;
  }
};

export default {
  createOrder,
};
