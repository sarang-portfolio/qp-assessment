"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrder = exports.orderValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const validator_1 = require("../../utility/validator");
exports.orderValidationSchema = joi_1.default.object({
    items: joi_1.default.array()
        .items(joi_1.default.object({
        groceryId: joi_1.default.number().integer().min(1).required().messages({
            'number.base': 'groceryId must be a number',
            'number.min': 'groceryId must be greater than or equal to 1',
            'any.required': 'groceryId is required',
        }),
        quantity: joi_1.default.number().integer().min(1).required().messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity must be greater than or equal to 1',
            'any.required': 'Quantity is required',
        }),
    }))
        .required()
        .messages({
        'array.base': 'Items must be an array',
        'array.includesRequiredUnknowns': 'Each item must have a valid groceryId and quantity',
        'any.required': 'Items array is required',
    }),
});
const validateOrder = (req, res, next) => {
    (0, validator_1.validateSchema)(exports.orderValidationSchema, req.body);
    next();
};
exports.validateOrder = validateOrder;
//# sourceMappingURL=order.validations.js.map