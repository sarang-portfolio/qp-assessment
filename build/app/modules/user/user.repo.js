"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const create = (user) => user_schema_1.userModel.create(Object.assign({}, user));
const getAll = () => user_schema_1.userModel.findAll();
const getOne = (user) => user_schema_1.userModel.findOne({ where: Object.assign({}, user) });
const updateOne = (id, user) => user_schema_1.userModel.update(user, { where: { id } });
const deleteOne = (id) => user_schema_1.userModel.destroy({ where: { id } });
exports.default = {
    create,
    getAll,
    getOne,
    updateOne,
    deleteOne,
};
//# sourceMappingURL=user.repo.js.map