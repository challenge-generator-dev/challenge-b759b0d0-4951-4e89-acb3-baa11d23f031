import { OrderStatus } from '../../../domain/entities/Order';

export class OrderResponseDto {
  id!: string;
  description!: string;
  status!: OrderStatus;
  createdAt!: Date;
  updatedAt?: Date;

  constructor(data: Partial<OrderResponseDto>) {
    if (data) {
      this.id = data.id;
      this.description = data.description;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }

  static fromOrder(order: any): OrderResponseDto {
    const response = new OrderResponseDto();
    response.id = order.id;
    response.description = order.description;
    response.status = order.status;
    response.createdAt = order.createdAt instanceof Date ? order.createdAt : new Date(order.createdAt);
    if (order.updatedAt) {
      response.updatedAt = order.updatedAt instanceof Date ? order.updatedAt : new Date(order.updatedAt);
    }
    return response;
  }

  static fromOrders(orders: any[]): OrderResponseDto[] {
    return orders.map(order => OrderResponseDto.fromOrder(order));
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt instanceof Date ? this.createdAt.toISOString() : this.createdAt,
      updatedAt: this.updatedAt ? (this.updatedAt instanceof Date ? this.updatedAt.toISOString() : this.updatedAt) : undefined,
    };
  }
}