import { Application } from 'express';
import express from 'express';
import { OrderController } from './infrastructure/controllers/OrderController';
import { OrderService } from './application/services/OrderService';
import { DynamoOrderRepository } from './infrastructure/repositories/DynamoOrderRepository';
import { errorHandler } from './infrastructure/middlewares/errorHandler';
import validationMiddleware from './infrastructure/middlewares/validation';
import { DynamoDBConfiguration } from './infrastructure/config/dynamoConfig';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

export class AppModule {
  private app: Application;
  private orderService: OrderService;
  private orderController: OrderController;

  constructor() {
    this.app = express();
    this.orderService = new OrderService(new DynamoOrderRepository());
    this.orderController = new OrderController(this.orderService);
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private setupRoutes(): void {
    this.app.use('/orders', validationMiddleware, this.orderController.getRouter());
    
    this.app.get('/health', (_req, res) => {
      res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    this.app.use(errorHandler);
  }

  public getApp(): Application {
    return this.app;
  }

  public async initialize(): Promise<void> {
    try {
      await DynamoDBConfiguration.createTableIfNotExists();
      console.log('DynamoDB table initialized successfully');
    } catch (error) {
      console.error('Failed to initialize DynamoDB table:', error);
    }
  }
}