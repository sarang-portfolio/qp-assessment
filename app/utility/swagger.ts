import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { Express } from 'express';

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
    path.join(__dirname, '../app.js'),
    path.join(__dirname, '../modules/*/*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    process.env.SWAGGER_DOCS_ROUTE as string,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
  );
};
