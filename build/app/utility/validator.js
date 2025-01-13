'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema, data) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(', ');
    throw {
      statusCode: 400,
      message: errorMessage,
    };
  }
  return value;
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validator.js.map
