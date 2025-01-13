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
exports.GroceryRouter = void 0;
const express_1 = require("express");
const common_1 = require("../../common");
const utility_1 = require("../../utility");
const grocery_service_1 = __importDefault(require("./grocery.service"));
const grocery_validations_1 = require("./grocery.validations");
exports.GroceryRouter = (0, express_1.Router)();
const { PRIVATE_CREATE_GROCERY, PRIVATE_DELETE_GROCERY, PRIVATE_GET_ALL_GROCERY, PRIVATE_UPDATE_GROCERY, } = common_1.GROCERY_ROUTES;
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
exports.GroceryRouter.post(PRIVATE_CREATE_GROCERY, grocery_validations_1.validateGrocery, (0, common_1.permit)([common_1.Roles.Admin]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceryDto = req.body;
        const response = yield grocery_service_1.default.createGrocery(groceryDto);
        res.send(new utility_1.ResponseHandler(response));
    }
    catch (error) {
        next(error);
    }
}));
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
exports.GroceryRouter.get(PRIVATE_GET_ALL_GROCERY, (0, common_1.permit)([common_1.Roles.Admin, common_1.Roles.User]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield grocery_service_1.default.getAllGroceries();
        res.send(new utility_1.ResponseHandler(response));
    }
    catch (error) {
        next(error);
    }
}));
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
exports.GroceryRouter.put(PRIVATE_UPDATE_GROCERY, grocery_validations_1.validateUpdateGroceryParams, grocery_validations_1.validateUpdateGroceryBody, (0, common_1.permit)([common_1.Roles.Admin]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceryId = Number(req.params.id);
        const groceryDto = req.body;
        const response = yield grocery_service_1.default.updateOneGrocery(groceryId, groceryDto);
        res.send(new utility_1.ResponseHandler(response));
    }
    catch (error) {
        next(error);
    }
}));
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
exports.GroceryRouter.delete(PRIVATE_DELETE_GROCERY, grocery_validations_1.validateDeleteGrocery, (0, common_1.permit)([common_1.Roles.Admin]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groceryId = Number(req.params.id);
        const response = yield grocery_service_1.default.deleteOneGrocery(groceryId);
        res.send(new utility_1.ResponseHandler(response));
    }
    catch (error) {
        next(error);
    }
}));
//# sourceMappingURL=grocery.routes.js.map