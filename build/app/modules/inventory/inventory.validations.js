"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateInventoryBody = exports.validateUpdateInventoryParams = void 0;
const joi_1 = __importDefault(require("joi"));
const validator_1 = require("../../utility/validator");
const inventory_types_1 = require("./inventory.types");
const createInventoryParamsSchema = joi_1.default.object({
    groceryId: joi_1.default.string().required().min(1).max(255).messages({
        'string.base': 'groceryId must be a string',
        'string.empty': 'groceryId cannot be empty',
        'any.required': 'groceryId is required',
    }),
});
const createInventoryBodySchema = joi_1.default.object({
    quantity: joi_1.default.number().integer().min(0).required().messages({
        'number.base': 'Quantity must be a number',
        'number.min': 'Quantity must be greater than or equal to 0',
        'any.required': 'Quantity is required',
    }),
    action: joi_1.default.string()
        .valid(inventory_types_1.Action.increment, inventory_types_1.Action.decrement, inventory_types_1.Action.set)
        .required()
        .messages({
        'string.base': 'Action must be a string',
        'any.only': 'Action must be one of "increment", "decrement", or "set"',
        'any.required': 'Action is required',
    }),
});
const validateUpdateInventoryParams = (req, res, next) => {
    (0, validator_1.validateSchema)(createInventoryParamsSchema, req.params);
    next();
};
exports.validateUpdateInventoryParams = validateUpdateInventoryParams;
const validateUpdateInventoryBody = (req, res, next) => {
    (0, validator_1.validateSchema)(createInventoryBodySchema, req.body);
    next();
};
exports.validateUpdateInventoryBody = validateUpdateInventoryBody;
//# sourceMappingURL=inventory.validations.js.map