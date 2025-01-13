import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { validateSchema } from '../../utility/validator';
import { CreateGroceryDto } from './grocery.types';

export const createGrocerySchema: ObjectSchema<CreateGroceryDto> =
  Joi.object<CreateGroceryDto>({
    name: Joi.string().trim().min(2).max(100).required().messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least 2 characters long.',
      'string.max': 'Name cannot exceed 100 characters.',
    }),

    description: Joi.string().trim().allow(null, '').max(500).messages({
      'string.max': 'Description cannot exceed 500 characters.',
    }),

    price: Joi.number().positive().precision(2).greater(0).required().messages({
      'number.base': 'Price must be a valid number.',
      'number.positive': 'Price must be a positive value.',
      'number.greater': 'Price must be greater than 0.',
      'number.precision': 'Price can have up to 2 decimal places.',
      'any.required': 'Price is required.',
    }),

    imageUrl: Joi.string().trim().uri().required().messages({
      'string.empty': 'Image URL is required.',
      'string.uri': 'Image URL must be a valid URI.',
    }),
  });

export const validateGrocery = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  validateSchema(createGrocerySchema, req.body);
  next();
};

const updateGroceryParamsSchema: ObjectSchema<{ id: string }> = Joi.object<{
  id: string;
}>({
  id: Joi.string()
    .pattern(/^[0-9]+$/, 'numeric ID')
    .required()
    .messages({
      'string.empty': 'ID is required.',
      'string.pattern.base': 'ID must be a numeric value.',
    }),
});

const updateGroceryBodySchema: ObjectSchema<Partial<CreateGroceryDto>> =
  Joi.object<Partial<CreateGroceryDto>>({
    name: Joi.string().trim().min(2).max(100).messages({
      'string.min': 'Name must be at least 2 characters long.',
      'string.max': 'Name cannot exceed 100 characters.',
    }),

    description: Joi.string().trim().allow(null, '').max(500).messages({
      'string.max': 'Description cannot exceed 500 characters.',
    }),

    price: Joi.number().positive().precision(2).greater(0).messages({
      'number.positive': 'Price must be a positive value.',
      'number.greater': 'Price must be greater than 0.',
      'number.precision': 'Price can have up to 2 decimal places.',
    }),

    imageUrl: Joi.string().trim().uri().messages({
      'string.uri': 'Image URL must be a valid URI.',
    }),
  })
    .min(1)
    .messages({
      'object.min': 'At least one field must be provided to update.',
    });

export const validateUpdateGroceryParams = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  validateSchema(updateGroceryParamsSchema, req.params);
  next();
};

export const validateUpdateGroceryBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  validateSchema(updateGroceryBodySchema, req.body);
  next();
};

const deleteGroceryParamsSchema: ObjectSchema<{ id: string }> = Joi.object<{
  id: string;
}>({
  id: Joi.string()
    .pattern(/^[0-9]+$/, 'numeric ID')
    .required()
    .messages({
      'string.empty': 'ID is required.',
      'string.pattern.base': 'ID must be a numeric value.',
    }),
});

export const validateDeleteGrocery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  validateSchema(deleteGroceryParamsSchema, req.params);
  next();
};
