import { Schema, ValidationResult } from "joi";

export const validateSchema = <T>(schema: Schema<T>, data: unknown): T => {
  const { error, value }: ValidationResult<T> = schema.validate(data, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw {
      statusCode: 400,
      message: errorMessage,
    };
  }
  return value;
};
