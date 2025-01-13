"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_schema_1 = require("./inventory.schema");
const getAll = () => inventory_schema_1.inventoryModel.findAll();
const getOne = (inventory) => inventory_schema_1.inventoryModel.findOne({ where: Object.assign({}, inventory) });
const updateOne = (id, inventory) => inventory_schema_1.inventoryModel.update(inventory, { where: { id } });
exports.default = {
    getAll,
    getOne,
    updateOne,
};
//# sourceMappingURL=inventory.repo.js.map