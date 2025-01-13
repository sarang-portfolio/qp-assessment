'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateDeleteGrocery =
  exports.validateUpdateGroceryBody =
  exports.validateUpdateGroceryParams =
  exports.validateGrocery =
  exports.createGrocerySchema =
    void 0;
const joi_1 = __importDefault(require('joi'));
const validator_1 = require('../../utility/validator');
exports.createGrocerySchema = joi_1.default.object({
  name: joi_1.default.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 2 characters long.',
    'string.max': 'Name cannot exceed 100 characters.',
  }),
  description: joi_1.default.string().trim().allow(null, '').max(500).messages({
    'string.max': 'Description cannot exceed 500 characters.',
  }),
  price: joi_1.default
    .number()
    .positive()
    .precision(2)
    .greater(0)
    .required()
    .messages({
      'number.base': 'Price must be a valid number.',
      'number.positive': 'Price must be a positive value.',
      'number.greater': 'Price must be greater than 0.',
      'number.precision': 'Price can have up to 2 decimal places.',
      'any.required': 'Price is required.',
    }),
  imageUrl: joi_1.default.string().trim().uri().required().messages({
    'string.empty': 'Image URL is required.',
    'string.uri': 'Image URL must be a valid URI.',
  }),
});
const validateGrocery = (req, res, next) => {
  (0, validator_1.validateSchema)(exports.createGrocerySchema, req.body);
  next();
};
exports.validateGrocery = validateGrocery;
const updateGroceryParamsSchema = joi_1.default.object({
  id: joi_1.default
    .string()
    .pattern(/^[0-9]+$/, 'numeric ID')
    .required()
    .messages({
      'string.empty': 'ID is required.',
      'string.pattern.base': 'ID must be a numeric value.',
    }),
});
const updateGroceryBodySchema = joi_1.default
  .object({
    name: joi_1.default.string().trim().min(2).max(100).messages({
      'string.min': 'Name must be at least 2 characters long.',
      'string.max': 'Name cannot exceed 100 characters.',
    }),
    description: joi_1.default
      .string()
      .trim()
      .allow(null, '')
      .max(500)
      .messages({
        'string.max': 'Description cannot exceed 500 characters.',
      }),
    price: joi_1.default.number().positive().precision(2).greater(0).messages({
      'number.positive': 'Price must be a positive value.',
      'number.greater': 'Price must be greater than 0.',
      'number.precision': 'Price can have up to 2 decimal places.',
    }),
    imageUrl: joi_1.default.string().trim().uri().messages({
      'string.uri': 'Image URL must be a valid URI.',
    }),
  })
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided to update.',
  });
const validateUpdateGroceryParams = (req, res, next) => {
  (0, validator_1.validateSchema)(updateGroceryParamsSchema, req.params);
  next();
};
exports.validateUpdateGroceryParams = validateUpdateGroceryParams;
const validateUpdateGroceryBody = (req, res, next) => {
  (0, validator_1.validateSchema)(updateGroceryBodySchema, req.body);
  next();
};
exports.validateUpdateGroceryBody = validateUpdateGroceryBody;
const deleteGroceryParamsSchema = joi_1.default.object({
  id: joi_1.default
    .string()
    .pattern(/^[0-9]+$/, 'numeric ID')
    .required()
    .messages({
      'string.empty': 'ID is required.',
      'string.pattern.base': 'ID must be a numeric value.',
    }),
});
const validateDeleteGrocery = (req, res, next) => {
  (0, validator_1.validateSchema)(deleteGroceryParamsSchema, req.params);
  next();
};
exports.validateDeleteGrocery = validateDeleteGrocery;
//# sourceMappingURL=grocery.validations.js.map
