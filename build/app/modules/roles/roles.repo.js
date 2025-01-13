"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_schema_1 = require("./roles.schema");
const getOne = (role) => roles_schema_1.roleModel.findOne({ where: Object.assign({}, role) });
exports.default = {
    getOne,
};
//# sourceMappingURL=roles.repo.js.map