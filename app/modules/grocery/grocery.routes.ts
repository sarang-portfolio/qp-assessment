import { NextFunction, Request, Response, Router } from "express";
import { GROCERY_ROUTES, permit, Roles } from "../../common";
import { MessageHandler, ResponseHandler } from "../../utility";
import groceryService from "./grocery.service";
import { CreateGroceryDto, GetAllGroceries, IGrocery } from "./grocery.types";
import {
  validateDeleteGrocery,
  validateGrocery,
  validateUpdateGroceryBody,
  validateUpdateGroceryParams,
} from "./grocery.validations";

export const GroceryRouter = Router();

const {
  PRIVATE_CREATE_GROCERY,
  PRIVATE_DELETE_GROCERY,
  PRIVATE_GET_ALL_GROCERY,
  PRIVATE_UPDATE_GROCERY,
} = GROCERY_ROUTES;

/**
 * @swagger
 * /grocery/createGrocery:
 *   post:
 *     tags:
 *       - Grocery Routes
 *     summary: Create Grocery Item
 *     description: Allows an Admin to create a new grocery item.
 *     security:
 *       - apiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Apple
 *               description:
 *                 type: string
 *                 example: Fresh red apples
 *               price:
 *                 type: number
 *                 example: 25
 *               imageUrl:
 *                 type: string
 *                 example: https://google.com/apple
 *     responses:
 *       201:
 *         description: Grocery item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: GROCERY CREATED
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad Request. Validation failed or invalid input.
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
 *                       example: Invalid request body or invalid data.
 *       403:
 *         description: Forbidden. Only Admin users can create grocery items.
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
 *                       example: 403
 *                     message:
 *                       type: string
 *                       example: FORBIDDEN
 */

GroceryRouter.post(
  PRIVATE_CREATE_GROCERY,
  validateGrocery,
  permit([Roles.Admin]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groceryDto = req.body as CreateGroceryDto;
      const response: MessageHandler = await groceryService.createGrocery(
        groceryDto
      );
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /grocery/getAllGrocery:
 *   get:
 *     tags:
 *       - Grocery Routes
 *     summary: Get All Grocery Items
 *     description: Allows Admin and User roles to view all grocery items.
 *     security:
 *       - apiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of all grocery items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Apple
 *                       description:
 *                         type: string
 *                         example: Fresh red apples
 *                       price:
 *                         type: number
 *                         example: 2.5
 *                       inventory.quantity:
 *                         type: number
 *                         example: 100
 *                       outOfStock:
 *                         type: boolean
 *                         example: false
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */

GroceryRouter.get(
  PRIVATE_GET_ALL_GROCERY,
  permit([Roles.Admin, Roles.User]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response: GetAllGroceries[] =
        await groceryService.getAllGroceries();
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /grocery/updateGrocery/{id}:
 *   put:
 *     tags:
 *       - Grocery Routes
 *     summary: Update Grocery Item
 *     description: Allows an Admin to update a grocery item.
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID of the grocery item to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Red Apple
 *               description:
 *                 type: string
 *                 example: Fresh red apples with a crispy texture.
 *               price:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Grocery item updated successfully.
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
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: GROCERY UPDATED
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad Request. Validation failed or invalid input.
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
 *                       example: Invalid request body or invalid data.
 *       403:
 *         description: Forbidden. Only Admin users can update grocery items.
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
 *                       example: 403
 *                     message:
 *                       type: string
 *                       example: FORBIDDEN
 *       409:
 *         description: Conflict. Grocery Not Updated.
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
 *                       example: 409
 *                     message:
 *                       type: string
 *                       example: GROCERY NOT UPDATED
 */

GroceryRouter.put(
  PRIVATE_UPDATE_GROCERY,
  validateUpdateGroceryParams,
  validateUpdateGroceryBody,
  permit([Roles.Admin]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groceryId = Number(req.params.id);
      const groceryDto = req.body as Partial<IGrocery>;
      const response: MessageHandler = await groceryService.updateOneGrocery(
        groceryId,
        groceryDto
      );
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /grocery/deleteGrocery/{id}:
 *   delete:
 *     tags:
 *       - Grocery Routes
 *     summary: Delete Grocery Item
 *     description: Allows an Admin to delete a grocery item.
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID of the grocery item to delete.
 *     responses:
 *       200:
 *         description: Grocery item deleted successfully.
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
 *                       example: 200
 *                     message:
 *                       type: string
 *                       example: GROCERY DELETED
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad Request. Invalid grocery item ID.
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
 *                       example: Invalid grocery item ID.
 *       403:
 *         description: Forbidden. Only Admin users can delete grocery items.
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
 *                       example: 403
 *                     message:
 *                       type: string
 *                       example: FORBIDDEN
 *       409:
 *         description: Conflict. Grocery Not Deleted.
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
 *                       example: 409
 *                     message:
 *                       type: string
 *                       example: GROCERY NOT DELETED
 */

GroceryRouter.delete(
  PRIVATE_DELETE_GROCERY,
  validateDeleteGrocery,
  permit([Roles.Admin]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const groceryId = Number(req.params.id);
      const response: MessageHandler = await groceryService.deleteOneGrocery(
        groceryId
      );
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);
