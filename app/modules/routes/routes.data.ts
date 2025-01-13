import {
  AUTH_ROUTES,
  GROCERY_ROUTES,
  INVENTORY_ROUTES,
  ORDER_ROUTES,
} from "../../common";
import { AuthRouter } from "../auth/auth.routes";
import { GroceryRouter } from "../grocery/grocery.routes";
import { InventoryRouter } from "../inventory/inventory.routes";
import { OrderRouter } from "../order/order.routes";
import { IExcludedPaths, Route, Routes } from "./routes.types";

const { PUBLIC_BASE_AUTH } = AUTH_ROUTES;
const { PUBLIC_BASE_GROCERY } = GROCERY_ROUTES;
const { PUBLIC_BASE_INVENTORY } = INVENTORY_ROUTES;
const { PUBLIC_BASE_ORDER } = ORDER_ROUTES;

export const routes: Routes = [
  new Route(PUBLIC_BASE_AUTH, AuthRouter),
  new Route(PUBLIC_BASE_GROCERY, GroceryRouter),
  new Route(PUBLIC_BASE_INVENTORY, InventoryRouter),
  new Route(PUBLIC_BASE_ORDER, OrderRouter),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "/auth/signUp", method: "POST" },
  { path: "/auth/login", method: "POST" },
  { path: "/api-docs", method: "GET" },
  { path: "/healthCheck", method: "GET" },
];
