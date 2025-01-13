import { GROCERY_CONSTANTS } from '../grocery/grocery.constants';
import groceryService from '../grocery/grocery.service';
import { PlaceOrderDto } from '../order/order.types';
import { INVENTORY_CONSTANTS, QUANTITY_LIMIT } from './inventory.constants';
import inventoryRepo from './inventory.repo';
import { Action, IInventory, UpdateInventoryDto } from './inventory.types';

const getOneinventory = async (
  inventoryDto: Partial<IInventory>,
): Promise<IInventory | null> => {
  try {
    const inventory = await inventoryRepo.getOne(inventoryDto);
    return inventory;
  } catch (error) {
    throw error;
  }
};

const updateOneinventory = async (
  groceryId: number,
  inventoryDto: UpdateInventoryDto,
) => {
  try {
    const groceryItem = await groceryService.getOneGrocery({ id: groceryId });
    if (!groceryItem) throw GROCERY_CONSTANTS.NOT_FOUND;
    const inventory = await getOneinventory({ id: groceryItem.id });
    if (!inventory) throw INVENTORY_CONSTANTS.NOT_FOUND;
    let newQuantity = inventory.quantity;
    switch (inventoryDto.action) {
      case Action.increment:
        newQuantity += inventoryDto.quantity;
        break;
      case Action.decrement:
        newQuantity -= inventoryDto.quantity;
        break;
      case Action.set:
        newQuantity = inventoryDto.quantity;
        break;
      default:
        throw INVENTORY_CONSTANTS.INVALID_ACTION;
    }
    if (newQuantity < QUANTITY_LIMIT.LOWER_LIMIT) {
      throw INVENTORY_CONSTANTS.QUANTITY_TOO_LOW;
    }
    if (newQuantity > QUANTITY_LIMIT.UPPER_LIMIT) {
      throw INVENTORY_CONSTANTS.QUANTITY_TOO_HIGH;
    }
    const isUpdated = await inventoryRepo.updateOne(inventory.id, {
      quantity: newQuantity,
    });
    const [affectedCount] = isUpdated;
    if (!affectedCount) throw INVENTORY_CONSTANTS.NOT_UPDATED;
    return INVENTORY_CONSTANTS.UPDATED;
  } catch (error) {
    throw error;
  }
};

const checkInventory = async (
  items: PlaceOrderDto[],
): Promise<{
  success: boolean;
  details: {
    groceryId: number;
    available: number;
  }[];
}> => {
  try {
    let details = [];
    let success = true;
    for (const item of items) {
      const inventory = await getOneinventory({ groceryId: item.groceryId });
      if (!inventory || inventory.quantity < item.quantity) {
        success = false;
        details.push({
          groceryId: item.groceryId,
          available: inventory?.quantity || 0,
        });
      }
    }
    return { success, details };
  } catch (error) {
    throw error;
  }
};

export default {
  getOneinventory,
  updateOneinventory,
  checkInventory,
};
