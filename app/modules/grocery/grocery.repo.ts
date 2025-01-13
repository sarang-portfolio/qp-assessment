import { sequelize } from '../../utility';
import { inventoryModel } from '../inventory/inventory.schema';
import { GROCERY_CONSTANTS } from './grocery.constants';
import { groceryModel } from './grocery.schema';
import { CreateGroceryDto, IGrocery } from './grocery.types';

const create = async (grocery: CreateGroceryDto): Promise<IGrocery> => {
  const transaction = await sequelize.transaction();

  try {
    const newGrocery = await groceryModel.create(
      { ...grocery },
      { transaction },
    );
    await inventoryModel.create(
      {
        groceryId: newGrocery.id,
        quantity: 0, // Default inventory quantity
      },
      { transaction },
    );
    await transaction.commit();
    return newGrocery;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getAll = (): Promise<IGrocery[]> =>
  groceryModel.findAll({
    where: { deletedAt: null },
    include: [
      {
        model: inventoryModel,
        attributes: ['quantity'],
      },
    ],
    raw: true,
    order: [['id', 'ASC']],
  });

const getOne = (grocery: Partial<IGrocery>): Promise<IGrocery | null> =>
  groceryModel.findOne({ where: { ...grocery, deletedAt: null } });

const updateOne = (
  id: number,
  grocery: Partial<IGrocery>,
): Promise<[affectedCount: number]> =>
  groceryModel.update(grocery, { where: { id } });

const deleteOne = async (id: number): Promise<number> => {
  const transaction = await sequelize.transaction();
  try {
    const groceryDeleteCount = await groceryModel.destroy({
      where: { id },
      transaction,
    });
    if (groceryDeleteCount === 0) {
      throw GROCERY_CONSTANTS.NOT_FOUND;
    }
    await inventoryModel.destroy({
      where: { groceryId: id },
      transaction,
    });
    await transaction.commit();
    return groceryDeleteCount;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
