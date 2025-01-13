'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require('swagger-jsdoc'));
const swagger_ui_express_1 = __importDefault(require('swagger-ui-express'));
const path_1 = __importDefault(require('path'));
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'GrocerEase API Docs',
    version: '1.0.0',
    description:
      'This is the API documentation for the GrocerEase application.',
  },
  servers: [
    {
      url: process.env.PROD_HOST_URL,
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
  },
};
const options = {
  swaggerDefinition,
  apis: [
    path_1.default.join(__dirname, '../app.js'),
    path_1.default.join(__dirname, '../modules/*/*.js'),
  ],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
  app.use(
    process.env.SWAGGER_DOCS_ROUTE,
    swagger_ui_express_1.default.serve,
    swagger_ui_express_1.default.setup(swaggerSpec),
  );
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map
