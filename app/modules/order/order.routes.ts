import { NextFunction, Request, Response, Router } from 'express';
import { ORDER_ROUTES, permit, Roles } from '../../common';
import { ResponseHandler } from '../../utility';
import orderService from './order.service';
import { PlaceOrderDto } from './order.types';
import { validateOrder } from './order.validations';

export const OrderRouter = Router();

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

OrderRouter.post(
  ORDER_ROUTES.PRIVATE_CREATE_ORDER,
  permit([Roles.User]),
  validateOrder,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = res.locals.user.userId;
      const items = req.body.items as PlaceOrderDto[];
      const response = await orderService.createOrder(userId, items);
      res.status(response.statusCode).send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  },
);
