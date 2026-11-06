import { Order } from '../entities/Order';

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(order: Order): Promise<Order>;
    delete(id: string): Promise<void>;
    list(): Promise<Order[]>;
}
"