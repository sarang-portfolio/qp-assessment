import cors from 'cors';
import { Application, json, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { authorize, ERROR_CODES } from '../../common';
import { ResponseHandler } from '../../utility';
import { excludedPaths, routes } from './routes.data';

export const registerRoutes = (app: Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(json());

  app.use(authorize(excludedPaths));

  for (let route of routes) {
    app.use(route.path, route.router);
  }

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res
      .status(err.statusCode || ERROR_CODES.INTERNAL_SERVER_ERROR)
      .send(new ResponseHandler(null, err));
  });
};
