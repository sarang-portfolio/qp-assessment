import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { sign, verify } from "jsonwebtoken";
import { IExcludedPaths } from "../../modules/routes/routes.types";
import { validateSchema } from "../../utility/validator";
import { BASE_EXCEPTION_CONSTANTS } from "../constants";
import { IPayload } from "../types";

export const authorize = (excludedPaths: IExcludedPaths[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (
        excludedPaths.find((e) => {
          return req.url.includes(e.path) && req.method.includes(e.method);
        })
      ) {
        return next();
      }

      const authorizationSchema: ObjectSchema<{ authorization: string }> =
        Joi.object<{ authorization: string }>({
          authorization: Joi.string().required().messages({
            "any.required": "Authorization header is required",
            "string.empty": "Authorization header cannot be empty",
          }),
        });
      validateSchema(authorizationSchema, req.headers);

      const token = req.headers.authorization as string;
      const payload = verifyToken(token);
      res.locals.user = payload;
      next();
    } catch (e) {
      next(BASE_EXCEPTION_CONSTANTS.UNAUTHORIZED);
    }
  };
};

export const createToken = (payload: IPayload) => {
  const { JWT_SECRET } = process.env;
  const token = sign(payload, JWT_SECRET || "");
  return token;
};

export const verifyToken = (token: string) => {
  const { JWT_SECRET } = process.env;
  const payload = verify(token, JWT_SECRET || "");
  return payload;
};

export const permit = (permittedRoles: number[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (permittedRoles.includes(res.locals.user.role)) {
      return next();
    }
    next(BASE_EXCEPTION_CONSTANTS.FORBIDDEN);
  };
};
