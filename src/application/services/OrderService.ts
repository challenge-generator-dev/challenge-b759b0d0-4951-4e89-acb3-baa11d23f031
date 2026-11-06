import { Order } from '../../domain/entities/Order';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { OrderStatus } from '../../domain/entities/Order';
import { v4 as uuidv4 } from 'uuid';

export class OrderService {
    private readonly orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public async createOrder(description: string, status: OrderStatus): Promise<Order> {
        const id = this.generateUniqueId();
        const order = Order.create(id, description, status);
        return await this.orderRepository.create(order);
    }

    public async getOrder(id: string): Promise<Order | null> {
        if (!this.isValidId(id)) {
            throw new Error('Invalid order ID format');
        }
        return await this.orderRepository.findById(id);
    }

    public async updateOrder(id: string, description: string, status: OrderStatus): Promise<Order> {
        const existingOrder = await this.orderRepository.findById(id);
        if (!existingOrder) {
            throw new Error(`Order with id ${id} not found`);
        }

        existingOrder.update(description, status);
        return await this.orderRepository.update(existingOrder);
    }

    public async deleteOrder(id: string): Promise<void> {
        const existingOrder = await this.orderRepository.findById(id);
        if (!existingOrder) {
            throw new Error(`Order with id ${id} not found`);
        }
        await this.orderRepository.delete(id);
    }

    public async listOrders(): Promise<Order[]> {
        return await this.orderRepository.list();
    }

    private generateUniqueId(): string {
        return uuidv4();
    }

    private isValidId(id: string): boolean {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(id);
    }
}