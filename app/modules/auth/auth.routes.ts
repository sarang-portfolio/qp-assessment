import { NextFunction, Request, Response, Router } from 'express';
import { AUTH_ROUTES } from '../../common';
import { MessageHandler, ResponseHandler } from '../../utility';
import authService from './auth.service';
import { LoginDto, SignUpDto } from './auth.types';
import { validateLogin, validateSignUp } from './auth.validations';

export const AuthRouter = Router();

const { PRIVATE_LOGIN, PRIVATE_SIGNUP } = AUTH_ROUTES;

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     tags:
 *       - Auth Routes
 *     summary: User Signup
 *     description: >
 *       Allows a user to create a new account.
 *       The `role` parameter is optional and should only be used to create an Admin by setting `role: "Admin"`.
 *       By default, the backend assigns the `User` role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Lorem
 *               lastName:
 *                 type: string
 *                 example: Ipsum
 *               email:
 *                 type: string
 *                 example: lorem@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *               role:
 *                 type: string
 *                 example: Admin
 *                 description: Optional. Use "Admin" to create an Admin account. Defaults to "User".
 *     responses:
 *       201:
 *         description: Signup successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     statusCode:
 *                       type: number
 *                       example: 201
 *                     message:
 *                       type: string
 *                       example: USER CREATED SUCCESSFULLY
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad Request. Validation failed or user already exists.
 *         content:
 *           application/json:
 *             examples:
 *               validationError:
 *                 summary: Validation Error
 *                 value:
 *                   data: null
 *                   error:
 *                     statusCode: 400
 *                     message: Invalid request body.
 *               userExists:
 *                 summary: User Already Exists
 *                 value:
 *                   data: null
 *                   error:
 *                     statusCode: 400
 *                     message: USER ALREADY EXISTS
 */

AuthRouter.post(
  PRIVATE_SIGNUP,
  validateSignUp,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const signUpDto = req.body as SignUpDto;
      const response: MessageHandler = await authService.signUp(signUpDto);
      res.status(response.statusCode).send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  },
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth Routes
 *     summary: User Login
 *     description: Authenticates a user and returns a JWT token for authorization.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: lorem@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad Request. Validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: object
 *                   properties:
 *                     statusCode:
 *                       type: number
 *                       example: 400
 *                     message:
 *                       type: string
 *                       example: Invalid request body.
 *       401:
 *         description: Unauthorized. Invalid Credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: object
 *                   properties:
 *                     statusCode:
 *                       type: number
 *                       example: 401
 *                     message:
 *                       type: string
 *                       example: INVALID CREDENTIALS
 *       404:
 *         description: Not Found. User Not Found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: object
 *                   properties:
 *                     statusCode:
 *                       type: number
 *                       example: 404
 *                     message:
 *                       type: string
 *                       example: USER NOT FOUND
 */

AuthRouter.post(
  PRIVATE_LOGIN,
  validateLogin,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const credentials = req.body as LoginDto;
      const response: { token: string } = await authService.login(credentials);
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  },
);
