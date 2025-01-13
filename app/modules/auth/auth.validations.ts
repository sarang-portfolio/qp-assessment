import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { validateSchema } from "../../utility/validator";
import { LoginDto, SignUpDto } from "./auth.types";

const signUpSchema: ObjectSchema<SignUpDto> = Joi.object<SignUpDto>({
  firstName: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z]+$/, "alphabetic characters")
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "First name is required.",
      "string.pattern.base":
        "First name must contain only alphabetic characters.",
      "string.min": "First name must be at least 2 characters long.",
      "string.max": "First name cannot exceed 50 characters.",
    }),
  lastName: Joi.string()
    .trim()
    .pattern(/^[a-zA-Z]+$/, "alphabetic characters")
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Last name is required.",
      "string.pattern.base":
        "Last name must contain only alphabetic characters.",
      "string.min": "Last name must be at least 2 characters long.",
      "string.max": "Last name cannot exceed 50 characters.",
    }),
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
  password: Joi.string()
    .min(8)
    .max(50)
    .pattern(/[a-z]/, "lowercase letters")
    .pattern(/[A-Z]/, "uppercase letters")
    .pattern(/[0-9]/, "numbers")
    .pattern(/[@$!%*?&#^]/, "special characters")
    .required()
    .messages({
      "string.empty": "Password is required.",
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 50 characters.",
      "string.pattern.name": "Password must include {#name}.",
    }),
  role: Joi.number()
    .valid("Admin", "User")
    .optional() // Only for project purpose for adding an admin and user easily.
    .messages({
      "number.base": "Role must be a number.",
      "any.only": "Role can only be Admin or User.",
    }),
});

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  validateSchema(signUpSchema, req.body);
  next();
};

const loginSchema: ObjectSchema<LoginDto> = Joi.object<LoginDto>({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: true } })
    .required()
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required.",
  }),
});

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  validateSchema(loginSchema, req.body);
  next();
};
