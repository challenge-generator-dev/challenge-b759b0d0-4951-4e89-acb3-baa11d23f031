import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { Order, OrderStatus } from '../../domain/entities/Order';
import { DynamoDBConfiguration } from '../config/dynamoConfig';

export class DynamoOrderRepository implements OrderRepository {
  private readonly tableName: string;
  private readonly docClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.tableName = DynamoDBConfiguration.getTableName();
    this.docClient = DynamoDBConfiguration.getDocumentClient();
  }

  async create(order: Order): Promise<Order> {
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: {
        id: order.id,
        description: order.description,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
      ConditionExpression: 'attribute_not_exists(id)',
    };

    try {
      await this.docClient.put(params).promise();
      return order;
    } catch (error: any) {
      if (error.code === 'ConditionalCheckFailedException') {
        throw new Error(`Order with id ${order.id} already exists`);
      }
      throw error;
    }
  }

  async findById(id: string): Promise<Order | null> {
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { id },
    };

    const result = await this.docClient.get(params).promise();
    
    if (!result.Item) {
      return null;
    }

    return this.mapToOrder(result.Item);
  }

  async update(order: Order): Promise<Order> {
    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { id: order.id },
      UpdateExpression: 'SET description = :description, #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
      },
      ExpressionAttributeValues: {
        ':description': order.description,
        ':status': order.status,
        ':updatedAt': order.updatedAt,
      },
      ConditionExpression: 'attribute_exists(id)',
    };

    try {
      await this.docClient.update(params).promise();
      return order;
    } catch (error: any) {
      if (error.code === 'ConditionalCheckFailedException') {
        throw new Error(`Order with id ${order.id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    const params: AWS.DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: { id },
      ConditionExpression: 'attribute_exists(id)',
    };

    try {
      await this.docClient.delete(params).promise();
    } catch (error: any) {
      if (error.code === 'ConditionalCheckFailedException') {
        throw new Error(`Order with id ${id} not found`);
      }
      throw error;
    }
  }

  async list(): Promise<Order[]> {
    const params: AWS.DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.docClient.scan(params).promise();
    
    if (!result.Items || result.Items.length === 0) {
      return [];
    }

    return result.Items.map((item) => this.mapToOrder(item));
  }

  private mapToOrder(item: any): Order {
    const order = new Order(
      item.id,
      item.description,
      item.status as OrderStatus,
      item.createdAt,
      item.updatedAt
    );
    return order;
  }
}