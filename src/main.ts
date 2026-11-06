import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { OrderController } from './infrastructure/controllers/OrderController';
import { errorHandler } from './infrastructure/middlewares/errorHandler';
import validationMiddleware from './infrastructure/middlewares/validation';
import { DynamoDBConfiguration } from './infrastructure/config/dynamoConfig';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const orderController = new OrderController(
  new (await import('./application/services/OrderService')).OrderService(
    new (await import('./infrastructure/repositories/DynamoOrderRepository')).DynamoOrderRepository()
  )
);

app.use('/orders', validationMiddleware, orderController.getRouter());

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

async function initializeDatabase(): Promise<void> {
  try {
    await DynamoDBConfiguration.createTableIfNotExists();
    console.log('DynamoDB table initialized successfully');
  } catch (error) {
    console.error('Failed to initialize DynamoDB table:', error);
  }
}

async function startServer(): Promise<void> {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});