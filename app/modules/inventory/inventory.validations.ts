import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { validateSchema } from "../../utility/validator";
import { Action, UpdateInventoryDto } from "./inventory.types";

const createInventoryParamsSchema: ObjectSchema<{ groceryId: string }> =
  Joi.object<{ groceryId: string }>({
    groceryId: Joi.string().required().min(1).max(255).messages({
      "string.base": "groceryId must be a string",
      "string.empty": "groceryId cannot be empty",
      "any.required": "groceryId is required",
    }),
  });

const createInventoryBodySchema: ObjectSchema<UpdateInventoryDto> =
  Joi.object<UpdateInventoryDto>({
    quantity: Joi.number().integer().min(0).required().messages({
      "number.base": "Quantity must be a number",
      "number.min": "Quantity must be greater than or equal to 0",
      "any.required": "Quantity is required",
    }),
    action: Joi.string()
      .valid(Action.increment, Action.decrement, Action.set)
      .required()
      .messages({
        "string.base": "Action must be a string",
        "any.only": 'Action must be one of "increment", "decrement", or "set"',
        "any.required": "Action is required",
      }),
  });

export const validateUpdateInventoryParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateSchema(createInventoryParamsSchema, req.params);
  next();
};

export const validateUpdateInventoryBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validateSchema(createInventoryBodySchema, req.body);
  next();
};
