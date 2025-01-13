import { NextFunction, Request, Response, Router } from 'express';
import { INVENTORY_ROUTES, permit, Roles } from '../../common';
import { ResponseHandler } from '../../utility';
import inventoryService from './inventory.service';
import {
  validateUpdateInventoryBody,
  validateUpdateInventoryParams,
} from './inventory.validations';

export const InventoryRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ActionType:
 *       type: string
 *       enum:
 *         - increment
 *         - decrement
 *         - set
 *       description: The type of action to perform on the inventory.
 */

/**
 * @swagger
 * /inventory/update/{groceryId}:
 *   put:
 *     tags:
 *       - Inventory Routes
 *     summary: Update Inventory
 *     description: Updates the inventory details for a specific grocery item.
 *     security:
 *       - apiKeyAuth: []
 *     parameters:
 *       - name: groceryId
 *         in: path
 *         required: true
 *         description: ID of the grocery item to update the inventory for.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: The new quantity of the grocery item.
 *                 example: 50
 *               action:
 *                 $ref: '#/components/schemas/ActionType'
 *     responses:
 *       200:
 *         description: Inventory updated successfully.
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
 *                       example: INVENTORY UPDATED
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
 *                       example: INVALID REQUEST BODY
 *       404:
 *         description: Not Found. Grocery item not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data: null
 *                 error:
 *                   type: object
 *                   properties:
 *                     statusCode:
 *                       type: number
 *                       example: 404
 *                     message:
 *                       type: string
 *                       example: GROCERY ITEM NOT FOUND
 */

InventoryRouter.put(
  INVENTORY_ROUTES.PRIVATE_UPDATE_INVENTORY,
  validateUpdateInventoryParams,
  validateUpdateInventoryBody,
  permit([Roles.Admin]),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { groceryId } = req.params;
      const inventoryDto = req.body;
      const response = await inventoryService.updateOneinventory(
        Number(groceryId),
        inventoryDto,
      );
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  },
);
