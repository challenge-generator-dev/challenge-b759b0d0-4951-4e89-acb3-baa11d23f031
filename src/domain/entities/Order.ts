import { v4 as uuidv4 } from 'uuid';

export class Order {
    constructor(
        public readonly id: string,
        public description: string,
        public status: OrderStatus,
        public readonly createdAt: Date,
        public updatedAt: Date
    ) {}

    static create(description: string, status: OrderStatus): Order {
        const now = new Date();
        return new Order(
            uuidv4(),
            description,
            status,
            now,
            now
        );
    }

    update(description: string, status: OrderStatus): void {
        this.description = description;
        this.status = status;
        this.updatedAt = new Date();
    }
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}
"