import { MessageHandler } from '../../utility';
import { PlaceOrderDto } from '../order/order.types';
import { GROCERY_CONSTANTS } from './grocery.constants';
import groceryRepo from './grocery.repo';
import { CreateGroceryDto, GetAllGroceries, IGrocery } from './grocery.types';

const createGrocery = async (
  groceryDto: CreateGroceryDto,
): Promise<MessageHandler> => {
  try {
    const existingGrocery = await getOneGrocery({ name: groceryDto.name });
    if (existingGrocery) throw GROCERY_CONSTANTS.ALREADY_EXIST;
    await groceryRepo.create(groceryDto);
    return GROCERY_CONSTANTS.CREATED;
  } catch (error) {
    throw error;
  }
};

const getAllGroceries = async (): Promise<GetAllGroceries[]> => {
  try {
    const groceries = await groceryRepo.getAll();
    return groceries.map((grocery: any) => ({
      ...grocery,
      outOfStock: grocery['inventory.quantity'] === 0,
    }));
  } catch (error) {
    throw error;
  }
};

const getOneGrocery = async (
  groceryDto: Partial<IGrocery>,
): Promise<IGrocery | null> => {
  try {
    const grocery: IGrocery | null = await groceryRepo.getOne(groceryDto);
    return grocery;
  } catch (error) {
    throw error;
  }
};

const updateOneGrocery = async (
  id: number,
  groceryDto: Partial<IGrocery>,
): Promise<MessageHandler> => {
  try {
    const isUpdated = await groceryRepo.updateOne(id, groceryDto);
    const [affectedCount] = isUpdated;
    if (affectedCount === 0) throw GROCERY_CONSTANTS.NOT_UPDATED;
    return GROCERY_CONSTANTS.UPDATED;
  } catch (error) {
    throw error;
  }
};

const deleteOneGrocery = async (id: number): Promise<MessageHandler> => {
  try {
    const isDeleted = await groceryRepo.deleteOne(id);
    if (!isDeleted) throw GROCERY_CONSTANTS.NOT_DELETED;
    return GROCERY_CONSTANTS.DELETED;
  } catch (error) {
    throw error;
  }
};

const calculateTotalAmount = async (
  items: PlaceOrderDto[],
): Promise<number> => {
  try {
    let total = 0;
    for (const item of items) {
      const grocery = await getOneGrocery({ id: item.groceryId });
      if (!grocery) throw `Grocery item with id ${item.groceryId} not found`;
      total += grocery.price * item.quantity;
    }
    return total;
  } catch (error) {
    throw error;
  }
};

export default {
  createGrocery,
  getAllGroceries,
  getOneGrocery,
  updateOneGrocery,
  deleteOneGrocery,
  calculateTotalAmount,
};
