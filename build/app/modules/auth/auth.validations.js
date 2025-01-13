'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateLogin = exports.validateSignUp = void 0;
const joi_1 = __importDefault(require('joi'));
const validator_1 = require('../../utility/validator');
const signUpSchema = joi_1.default.object({
  firstName: joi_1.default
    .string()
    .trim()
    .pattern(/^[a-zA-Z]+$/, 'alphabetic characters')
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'First name is required.',
      'string.pattern.base':
        'First name must contain only alphabetic characters.',
      'string.min': 'First name must be at least 2 characters long.',
      'string.max': 'First name cannot exceed 50 characters.',
    }),
  lastName: joi_1.default
    .string()
    .trim()
    .pattern(/^[a-zA-Z]+$/, 'alphabetic characters')
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Last name is required.',
      'string.pattern.base':
        'Last name must contain only alphabetic characters.',
      'string.min': 'Last name must be at least 2 characters long.',
      'string.max': 'Last name cannot exceed 50 characters.',
    }),
  email: joi_1.default
    .string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),
  password: joi_1.default
    .string()
    .min(8)
    .max(50)
    .pattern(/[a-z]/, 'lowercase letters')
    .pattern(/[A-Z]/, 'uppercase letters')
    .pattern(/[0-9]/, 'numbers')
    .pattern(/[@$!%*?&#^]/, 'special characters')
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot exceed 50 characters.',
      'string.pattern.name': 'Password must include {#name}.',
    }),
  role: joi_1.default
    .number()
    .valid('Admin', 'User')
    .optional() // Only for project purpose for adding an admin and user easily.
    .messages({
      'number.base': 'Role must be a number.',
      'any.only': 'Role can only be Admin or User.',
    }),
});
const validateSignUp = (req, res, next) => {
  (0, validator_1.validateSchema)(signUpSchema, req.body);
  next();
};
exports.validateSignUp = validateSignUp;
const loginSchema = joi_1.default.object({
  email: joi_1.default
    .string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.',
    }),
  password: joi_1.default.string().required().messages({
    'string.empty': 'Password is required.',
  }),
});
const validateLogin = (req, res, next) => {
  (0, validator_1.validateSchema)(loginSchema, req.body);
  next();
};
exports.validateLogin = validateLogin;
//# sourceMappingURL=auth.validations.js.map
