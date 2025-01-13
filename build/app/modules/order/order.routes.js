"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = require("express");
const common_1 = require("../../common");
const utility_1 = require("../../utility");
const order_service_1 = __importDefault(require("./order.service"));
const order_validations_1 = require("./order.validations");
exports.OrderRouter = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       properties:
 *         groceryId:
 *           type: integer
 *           description: ID of the grocery item to order.
 *           example: 1
 *         quantity:
 *           type: integer
 *           description: Quantity of the grocery item to order.
 *           example: 5
 *     CreateOrderRequest:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *           description: List of items to be ordered.
 *           example:
 *             - groceryId: 1
 *               quantity: 5
 *             - groceryId: 2
 *               quantity: 3
 *     CreateOrderResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             statusCode:
 *               type: number
 *               example: 201
 *             message:
 *               type: string
 *               example: ORDER CREATED
 *         error:
 *           type: string
 *           nullable: true
 *           example: null
 */
/**
 * @swagger
 * /order/createOrder:
 *   post:
 *     tags:
 *       - Order Routes
 *     summary: Create Order
 *     description: Places a new order for the user.
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateOrderResponse'
 *       400:
 *         description: Bad Request. Validation failed or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     statusCode:
 *                       type: number
 *                       example: 400
 *                     message:
 *                       type: string
 *                       example: INVALID ORDER DATA
 *       409:
 *         description: Conflict. Insufficient Inventory.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     statusCode:
 *                       type: number
 *                       example: 409
 *                     message:
 *                       type: string
 *                       example: INSUFFICIENT INVENTORY
 */
exports.OrderRouter.post(common_1.ORDER_ROUTES.PRIVATE_CREATE_ORDER, (0, common_1.permit)([common_1.Roles.User]), order_validations_1.validateOrder, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.userId;
        const items = req.body.items;
        const response = yield order_service_1.default.createOrder(userId, items);
        res.status(response.statusCode).send(new utility_1.ResponseHandler(response));
    }
    catch (error) {
        next(error);
    }
}));
//# sourceMappingURL=order.routes.js.map