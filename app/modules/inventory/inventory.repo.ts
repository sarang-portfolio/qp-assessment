import { inventoryModel } from "./inventory.schema";
import { IInventory } from "./inventory.types";

const getAll = (): Promise<IInventory[]> => inventoryModel.findAll();

const getOne = (inventory: Partial<IInventory>): Promise<IInventory | null> =>
  inventoryModel.findOne({ where: { ...inventory } });

const updateOne = (
  id: number,
  inventory: Partial<IInventory>
): Promise<[affectedCount: number]> =>
  inventoryModel.update(inventory, { where: { id } });

export default {
  getAll,
  getOne,
  updateOne,
};
