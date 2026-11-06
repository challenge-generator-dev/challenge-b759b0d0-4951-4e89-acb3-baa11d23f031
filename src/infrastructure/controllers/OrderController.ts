import { Request, Response, NextFunction, Router } from 'express';
import { OrderService } from '../../application/services/OrderService';
import { CreateOrderDto } from './dto/CreateOrderDto';
import { UpdateOrderDto } from './dto/UpdateOrderDto';
import { OrderResponseDto } from './dto/OrderResponseDto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

const router = Router();

export class OrderController {
  private readonly orderService: OrderService;

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = plainToInstance(CreateOrderDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({
          statusCode: 400,
          message: 'Validation failed',
          errors: errors.map(err => ({
            field: err.property,
            messages: Object.values(err.constraints || {}),
          })),
        });
        return;
      }

      const order = await this.orderService.createOrder(
        dto.description,
        dto.status
      );

      const response: OrderResponseDto = {
        id: order.id,
        description: order.description,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrder(id);

      if (!order) {
        res.status(404).json({
          statusCode: 404,
          message: 'Order not found',
        });
        return;
      }

      const response: OrderResponseDto = {
        id: order.id,
        description: order.description,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const dto = plainToInstance(UpdateOrderDto, req.body);
      const errors = await validate(dto);

      if (errors.length > 0) {
        res.status(400).json({
          statusCode: 400,
          message: 'Validation failed',
          errors: errors.map(err => ({
            field: err.property,
            messages: Object.values(err.constraints || {}),
          })),
        });
        return;
      }

      const existingOrder = await this.orderService.getOrder(id);
      if (!existingOrder) {
        res.status(404).json({
          statusCode: 404,
          message: 'Order not found',
        });
        return;
      }

      const updatedOrder = await this.orderService.updateOrder(
        id,
        dto.description,
        dto.status
      );

      const response: OrderResponseDto = {
        id: updatedOrder.id,
        description: updatedOrder.description,
        status: updatedOrder.status,
        createdAt: updatedOrder.createdAt,
        updatedAt: updatedOrder.updatedAt,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const existingOrder = await this.orderService.getOrder(id);

      if (!existingOrder) {
        res.status(404).json({
          statusCode: 404,
          message: 'Order not found',
        });
        return;
      }

      await this.orderService.deleteOrder(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async listOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await this.orderService.listOrders();

      const response: OrderResponseDto[] = orders.map(order => ({
        id: order.id,
        description: order.description,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }));

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  getRouter(): Router {
    const router = Router();
    router.post('/', this.createOrder.bind(this));
    router.get('/:id', this.getOrder.bind(this));
    router.put('/:id', this.updateOrder.bind(this));
    router.delete('/:id', this.deleteOrder.bind(this));
    router.get('/', this.listOrders.bind(this));
    return router;
  }
}