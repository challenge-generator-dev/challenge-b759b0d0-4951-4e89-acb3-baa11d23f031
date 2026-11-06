import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

export interface DynamoDBConfig {
  region: string;
  endpoint?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

export class DynamoDBConfiguration {
  private static instance: AWS.DynamoDB.DocumentClient;
  private static config: DynamoDBConfig;

  private constructor() {}

  static getConfig(): DynamoDBConfig {
    const isLocal = process.env.DYNAMODB_ENDPOINT !== undefined;
    const region = process.env.AWS_REGION || 'us-east-1';
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    return {
      region,
      ...(endpoint && { endpoint }),
      ...(accessKeyId && { accessKeyId }),
      ...(secretAccessKey && { secretAccessKey }),
    };
  }

  static getDocumentClient(): AWS.DynamoDB.DocumentClient {
    if (!DynamoDBConfiguration.instance) {
      const config = DynamoDBConfiguration.getConfig();
      
      const dynamoConfig: AWS.DynamoDB.DocumentClientConfiguration = {
        region: config.region,
      };

      if (config.endpoint) {
        dynamoConfig.endpoint = config.endpoint;
      }

      if (config.accessKeyId && config.secretAccessKey) {
        dynamoConfig.credentials = {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        };
      }

      DynamoDBConfiguration.instance = new AWS.DynamoDB.DocumentClient(dynamoConfig);
    }

    return DynamoDBConfiguration.instance;
  }

  static getTableName(): string {
    const tableName = process.env.DYNAMODB_TABLE_NAME;
    if (!tableName) {
      throw new Error('DYNAMODB_TABLE_NAME environment variable is not set');
    }
    return tableName;
  }

  static async createTableIfNotExists(): Promise<void> {
    const dynamoDB = new AWS.DynamoDB();
    const tableName = DynamoDBConfiguration.getTableName();

    try {
      await dynamoDB.describeTable({ TableName: tableName }).promise();
      console.log(`Table ${tableName} already exists`);
    } catch (error: any) {
      if (error.code === 'ResourceNotFoundException') {
        const tableParams: AWS.DynamoDB.CreateTableInput = {
          TableName: tableName,
          KeySchema: [
            { AttributeName: 'id', KeyType: 'HASH' },
          ],
          AttributeDefinitions: [
            { AttributeName: 'id', AttributeType: 'S' },
          ],
          BillingMode: 'PAY_PER_REQUEST',
        };

        await dynamoDB.createTable(tableParams).promise();
        console.log(`Table ${tableName} created successfully`);
        
        await DynamoDBConfiguration.waitForTableActive(tableName);
      } else {
        throw error;
      }
    }
  }

  private static async waitForTableActive(tableName: string): Promise<void> {
    const dynamoDB = new AWS.DynamoDB();
    let attempts = 0;
    const maxAttempts = 30;

    while (attempts < maxAttempts) {
      const result = await dynamoDB.describeTable({ TableName: tableName }).promise();
      if (result.Table?.TableStatus === 'ACTIVE') {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }

    throw new Error(`Table ${tableName} did not become active in time`);
  }
}

export { AWS };