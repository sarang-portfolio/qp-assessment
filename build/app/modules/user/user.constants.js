"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_CONSTANTS = void 0;
const utility_1 = require("../../utility");
exports.USER_CONSTANTS = {
    EXISTS: new utility_1.MessageHandler(400, "USER ALREADY EXISTS"),
    CREATED: new utility_1.MessageHandler(201, "USER CREATED SUCCESSFULLY"),
    NOT_FOUND: new utility_1.MessageHandler(404, "USER NOT FOUND"),
};
//# sourceMappingURL=user.constants.js.map