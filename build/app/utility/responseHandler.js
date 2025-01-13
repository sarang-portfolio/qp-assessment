"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandler = exports.ResponseHandler = void 0;
class ResponseHandler {
    constructor(data, error = null) {
        this.data = data;
        this.error = error;
    }
}
exports.ResponseHandler = ResponseHandler;
class MessageHandler {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.MessageHandler = MessageHandler;
//# sourceMappingURL=responseHandler.js.map