import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';
import { validateSchema } from '../../utility/validator';
import { ValidatePlaceOrder } from './order.types';

export const orderValidationSchema: ObjectSchema<ValidatePlaceOrder> =
  Joi.object<ValidatePlaceOrder>({
    items: Joi.array()
      .items(
        Joi.object({
          groceryId: Joi.number().integer().min(1).required().messages({
            'number.base': 'groceryId must be a number',
            'number.min': 'groceryId must be greater than or equal to 1',
            'any.required': 'groceryId is required',
          }),
          quantity: Joi.number().integer().min(1).required().messages({
            'number.base': 'Quantity must be a number',
            'number.min': 'Quantity must be greater than or equal to 1',
            'any.required': 'Quantity is required',
          }),
        }),
      )
      .required()
      .messages({
        'array.base': 'Items must be an array',
        'array.includesRequiredUnknowns':
          'Each item must have a valid groceryId and quantity',
        'any.required': 'Items array is required',
      }),
  });

export const validateOrder = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  validateSchema(orderValidationSchema, req.body);
  next();
};
