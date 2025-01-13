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
exports.InventoryRouter = void 0;
const express_1 = require("express");
const common_1 = require("../../common");
const utility_1 = require("../../utility");
const inventory_service_1 = __importDefault(require("./inventory.service"));
const inventory_validations_1 = require("./inventory.validations");
exports.InventoryRouter = (0, express_1.Router)();
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
exports.InventoryRouter.put(common_1.INVENTORY_ROUTES.PRIVATE_UPDATE_INVENTORY, inventory_validations_1.validateUpdateInventoryParams, inventory_validations_1.validateUpdateInventoryBody, (0, common_1.permit)([common_1.Roles.Admin]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groceryId } = req.params;
        const inventoryDto = req.body;
        const response = yield inventory_service_1.default.updateOneinventory(Number(groceryId), inventoryDto);
        res.send(new utility_1.ResponseHandler(response));
    }
    catch (error) {
        next(error);
    }
}));
//# sourceMappingURL=inventory.routes.js.map