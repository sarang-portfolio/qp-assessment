"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedPaths = exports.routes = void 0;
const common_1 = require("../../common");
const auth_routes_1 = require("../auth/auth.routes");
const grocery_routes_1 = require("../grocery/grocery.routes");
const inventory_routes_1 = require("../inventory/inventory.routes");
const order_routes_1 = require("../order/order.routes");
const routes_types_1 = require("./routes.types");
const { PUBLIC_BASE_AUTH } = common_1.AUTH_ROUTES;
const { PUBLIC_BASE_GROCERY } = common_1.GROCERY_ROUTES;
const { PUBLIC_BASE_INVENTORY } = common_1.INVENTORY_ROUTES;
const { PUBLIC_BASE_ORDER } = common_1.ORDER_ROUTES;
exports.routes = [
    new routes_types_1.Route(PUBLIC_BASE_AUTH, auth_routes_1.AuthRouter),
    new routes_types_1.Route(PUBLIC_BASE_GROCERY, grocery_routes_1.GroceryRouter),
    new routes_types_1.Route(PUBLIC_BASE_INVENTORY, inventory_routes_1.InventoryRouter),
    new routes_types_1.Route(PUBLIC_BASE_ORDER, order_routes_1.OrderRouter),
];
exports.excludedPaths = [
    { path: '/auth/signUp', method: 'POST' },
    { path: '/auth/login', method: 'POST' },
    { path: '/api-docs', method: 'GET' },
    { path: '/healthCheck', method: 'GET' },
];
//# sourceMappingURL=routes.data.js.map