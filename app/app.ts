import express, { NextFunction, Request, Response } from "express";
import { HEALTH_CHECK_ROUTES, SUCCESS_CODES, SUCCESS_MESSAGES } from "./common";
import { connectToPostgres } from "./connections";
import { registerRoutes } from "./modules/routes/routes.register";
import { ResponseHandler } from "./utility";
import { setupSwagger } from "./utility/swagger";

const startServer = async () => {
  try {
    const app = express();
    await connectToPostgres();
    registerRoutes(app);
    setupSwagger(app);

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

    app.get(
      HEALTH_CHECK_ROUTES.CHECK_HEALTH,
      (req: Request, res: Response, next: NextFunction): void => {
        res.send(
          new ResponseHandler({
            statusCode: SUCCESS_CODES.SUCCESS,
            message: SUCCESS_MESSAGES.HEALTH_CHECK_SUCCESS,
          })
        );
      }
    );

    const { PORT } = process.env;
    app.listen(PORT, () => {
      console.log(SUCCESS_MESSAGES.SERVER_RUN_SUCCESS + PORT);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default startServer;
