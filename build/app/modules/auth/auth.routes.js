'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthRouter = void 0;
const express_1 = require('express');
const common_1 = require('../../common');
const utility_1 = require('../../utility');
const auth_service_1 = __importDefault(require('./auth.service'));
const auth_validations_1 = require('./auth.validations');
exports.AuthRouter = (0, express_1.Router)();
const { PRIVATE_LOGIN, PRIVATE_SIGNUP } = common_1.AUTH_ROUTES;
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
exports.AuthRouter.post(
  PRIVATE_SIGNUP,
  auth_validations_1.validateSignUp,
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const signUpDto = req.body;
        const response = yield auth_service_1.default.signUp(signUpDto);
        res
          .status(response.statusCode)
          .send(new utility_1.ResponseHandler(response));
      } catch (error) {
        next(error);
      }
    }),
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
exports.AuthRouter.post(
  PRIVATE_LOGIN,
  auth_validations_1.validateLogin,
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const credentials = req.body;
        const response = yield auth_service_1.default.login(credentials);
        res.send(new utility_1.ResponseHandler(response));
      } catch (error) {
        next(error);
      }
    }),
);
//# sourceMappingURL=auth.routes.js.map
