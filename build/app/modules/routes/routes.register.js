'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.registerRoutes = void 0;
const cors_1 = __importDefault(require('cors'));
const express_1 = require('express');
const helmet_1 = __importDefault(require('helmet'));
const common_1 = require('../../common');
const utility_1 = require('../../utility');
const routes_data_1 = require('./routes.data');
const registerRoutes = (app) => {
  app.use((0, helmet_1.default)());
  app.use((0, cors_1.default)());
  app.use((0, express_1.json)());
  app.use((0, common_1.authorize)(routes_data_1.excludedPaths));
  for (let route of routes_data_1.routes) {
    app.use(route.path, route.router);
  }
  app.use((err, req, res, next) => {
    res
      .status(err.statusCode || common_1.ERROR_CODES.INTERNAL_SERVER_ERROR)
      .send(new utility_1.ResponseHandler(null, err));
  });
};
exports.registerRoutes = registerRoutes;
//# sourceMappingURL=routes.register.js.map
