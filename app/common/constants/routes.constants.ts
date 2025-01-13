export const HEALTH_CHECK_ROUTES = {
  CHECK_HEALTH: "/healthCheck",
};

export const AUTH_ROUTES = {
  PUBLIC_BASE_AUTH: "/auth",
  PRIVATE_SIGNUP: "/signUp",
  PRIVATE_LOGIN: "/login",
};

export const GROCERY_ROUTES = {
  PUBLIC_BASE_GROCERY: "/grocery",
  PRIVATE_CREATE_GROCERY: "/createGrocery",
  PRIVATE_GET_ALL_GROCERY: "/getAllGrocery",
  PRIVATE_UPDATE_GROCERY: "/updateGrocery/:id",
  PRIVATE_DELETE_GROCERY: "/deleteGrocery/:id",
};

export const INVENTORY_ROUTES = {
  PUBLIC_BASE_INVENTORY: "/inventory",
  PRIVATE_UPDATE_INVENTORY: "/update/:groceryId",
};

export const ORDER_ROUTES = {
  PUBLIC_BASE_ORDER: "/order",
  PRIVATE_CREATE_ORDER: "/createOrder",
};
