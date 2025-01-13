"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GROCERY_CONSTANTS = void 0;
const utility_1 = require("../../utility");
exports.GROCERY_CONSTANTS = {
    NOT_FOUND: new utility_1.MessageHandler(404, 'GROCERY ITEM NOT FOUND'),
    CREATED: new utility_1.MessageHandler(201, 'GROCERY CREATED'),
    ALREADY_EXIST: new utility_1.MessageHandler(400, 'GROCERY ALREADY EXISTS'),
    UPDATED: new utility_1.MessageHandler(200, 'GROCERY UPDATED'),
    NOT_UPDATED: new utility_1.MessageHandler(409, 'GROCERY NOT UPDATED'),
    DELETED: new utility_1.MessageHandler(200, 'GROCERY DELETED'),
    NOT_DELETED: new utility_1.MessageHandler(409, 'GROCERY NOT DELETED'),
};
//# sourceMappingURL=grocery.constants.js.map