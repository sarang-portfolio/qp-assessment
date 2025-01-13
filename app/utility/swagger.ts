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
      url: 'http://localhost:3000',
      description: 'Development server',
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
    path.join(__dirname, '../app.ts'),
    path.join(__dirname, '../modules/*/*.ts'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use(
    process.env.SWAGGER_DOCS_DEV_PATH as string,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec),
  );
};
