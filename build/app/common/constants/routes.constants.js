"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_ROUTES = exports.INVENTORY_ROUTES = exports.GROCERY_ROUTES = exports.AUTH_ROUTES = exports.HEALTH_CHECK_ROUTES = void 0;
exports.HEALTH_CHECK_ROUTES = {
    CHECK_HEALTH: "/healthCheck",
};
exports.AUTH_ROUTES = {
    PUBLIC_BASE_AUTH: "/auth",
    PRIVATE_SIGNUP: "/signUp",
    PRIVATE_LOGIN: "/login",
};
exports.GROCERY_ROUTES = {
    PUBLIC_BASE_GROCERY: "/grocery",
    PRIVATE_CREATE_GROCERY: "/createGrocery",
    PRIVATE_GET_ALL_GROCERY: "/getAllGrocery",
    PRIVATE_UPDATE_GROCERY: "/updateGrocery/:id",
    PRIVATE_DELETE_GROCERY: "/deleteGrocery/:id",
};
exports.INVENTORY_ROUTES = {
    PUBLIC_BASE_INVENTORY: "/inventory",
    PRIVATE_UPDATE_INVENTORY: "/update/:groceryId",
};
exports.ORDER_ROUTES = {
    PUBLIC_BASE_ORDER: "/order",
    PRIVATE_CREATE_ORDER: "/createOrder",
};
//# sourceMappingURL=routes.constants.js.map