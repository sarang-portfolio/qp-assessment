"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../../utility");
const inventory_schema_1 = require("../inventory/inventory.schema");
const grocery_constants_1 = require("./grocery.constants");
const grocery_schema_1 = require("./grocery.schema");
const create = (grocery) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield utility_1.sequelize.transaction();
    try {
        const newGrocery = yield grocery_schema_1.groceryModel.create(Object.assign({}, grocery), { transaction });
        yield inventory_schema_1.inventoryModel.create({
            groceryId: newGrocery.id,
            quantity: 0, // Default inventory quantity
        }, { transaction });
        yield transaction.commit();
        return newGrocery;
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
const getAll = () => grocery_schema_1.groceryModel.findAll({
    where: { deletedAt: null },
    include: [
        {
            model: inventory_schema_1.inventoryModel,
            attributes: ["quantity"],
        },
    ],
    raw: true,
    order: [["id", "ASC"]],
});
const getOne = (grocery) => grocery_schema_1.groceryModel.findOne({ where: Object.assign(Object.assign({}, grocery), { deletedAt: null }) });
const updateOne = (id, grocery) => grocery_schema_1.groceryModel.update(grocery, { where: { id } });
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield utility_1.sequelize.transaction();
    try {
        const groceryDeleteCount = yield grocery_schema_1.groceryModel.destroy({
            where: { id },
            transaction,
        });
        if (groceryDeleteCount === 0) {
            throw grocery_constants_1.GROCERY_CONSTANTS.NOT_FOUND;
        }
        yield inventory_schema_1.inventoryModel.destroy({
            where: { groceryId: id },
            transaction,
        });
        yield transaction.commit();
        return groceryDeleteCount;
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.default = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne,
};
//# sourceMappingURL=grocery.repo.js.map