'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const common_1 = require('./common');
const connections_1 = require('./connections');
const routes_register_1 = require('./modules/routes/routes.register');
const utility_1 = require('./utility');
const swagger_1 = require('./utility/swagger');
const startServer = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const app = (0, express_1.default)();
      yield (0, connections_1.connectToPostgres)();
      (0, routes_register_1.registerRoutes)(app);
      (0, swagger_1.setupSwagger)(app);
      /**
       * @swagger
       * tags:
       *   - name: Server Health
       *     description: Health Check operations for Server.
       */
      /**
       * @swagger
       * /healthCheck:
       *   get:
       *     tags:
       *       - Server Health
       *     summary: Health Check
       *     description: Endpoint to check the health of the server. Returns a success message if the server is running properly.
       *     responses:
       *       200:
       *         description: Health check successful.
       *         content:
       *           application/json:
       *             schema:
       *               type: object
       *               properties:
       *                 statusCode:
       *                   type: number
       *                   example: 200
       *                 message:
       *                   type: string
       *                   example: HEALTH CHECK SUCCESSFUL.
       */
      app.get(common_1.HEALTH_CHECK_ROUTES.CHECK_HEALTH, (req, res, next) => {
        res.send(
          new utility_1.ResponseHandler({
            statusCode: common_1.SUCCESS_CODES.SUCCESS,
            message: common_1.SUCCESS_MESSAGES.HEALTH_CHECK_SUCCESS,
          }),
        );
      });
      const { PORT } = process.env;
      app.listen(PORT, () => {
        console.log(common_1.SUCCESS_MESSAGES.SERVER_RUN_SUCCESS + PORT);
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
exports.default = startServer;
//# sourceMappingURL=app.js.map
