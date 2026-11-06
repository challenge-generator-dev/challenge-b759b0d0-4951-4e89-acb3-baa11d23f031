# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate` — componente `infra` (support).
3. `npm install && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`
  - `GET /orders`

## Herramientas

- **Terraform**: Herramienta de trabajo del candidato: usala en la fase donde se depura o se prueba la solucion (no es una dependencia del proyecto).

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos corruptos — arreglar primero

El contenido no corresponde a la extension. Regeneralos completos:

- `infra/src/main/java/Application.java` — El contenido no corresponde a un archivo java. Hay que regenerarlo completo.
- `infra/src/main/java/Application.java` — El contenido no corresponde a un archivo java. Hay que regenerarlo completo.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `package.json` — `typescript@5.7.0`: typescript declara la version 5.7.0, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build && (cd infra && terraform fmt -check -recursive && terraform init -backend=false && terraform validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB expuesto por una API REST (corrida e2e 20261106160222034), Implementa operaciones CRUD de ordenes sobre una tabla DynamoDB expuestas por una API REST

### Misión / candidato
Persistir y consultar ordenes

### Reto
- Tema: CRUD de ordenes sobre DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de órdenes en DynamoDB
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración y creación de la tabla DynamoDB — objetivo: Configurar DynamoDB y crear la tabla de órdenes. — entregable (NO resolver): Tabla DynamoDB creada y configurada para almacenar órdenes.
- Fase 2: Implementación de operaciones CRUD — objetivo: Implementar las operaciones CRUD para la tabla de órdenes. — entregable (NO resolver): Operaciones CRUD implementadas y funcionales para la tabla de órdenes en DynamoDB.
- Fase 3: Exposición de operaciones CRUD a través de una API REST — objetivo: Exponerse las operaciones CRUD a través de una API REST. — entregable (NO resolver): API REST funcional que expone las operaciones CRUD para la tabla de órdenes en DynamoDB.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "order-crud-api",
  "version": "1.0.0",
  "description": "API REST para gestión de órdenes sobre DynamoDB",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/main.js",
    "dev": "ts-node src/main.ts",
    "test": "jest",
    "lint": "eslint . --ext .ts",
    "prisma:generate": "prisma generate",
    "prepare": "npm run build"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "aws-sdk": "2.1664.0",
    "class-transformer": "0.5.1",
    "class-validator": "0.14.1",
    "dotenv": "16.4.5",
    "express": "4.21.0",
    "reflect-metadata": "0.2.2",
    "swagger-ui-express": "5.0.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/jest": "29.5.12",
    "@types/node": "22.5.4",
    "@types/swagger-ui-express": "4.1.6",
    "@types/uuid": "^9.0.8",
    "@typescript-eslint/eslint-plugin": "7.2.0",
    "@typescript-eslint/parser": "7.2.0",
    "eslint": "8.57.0",
    "jest": "29.7.0",
    "supertest": "6.3.4",
    "ts-node": "10.9.2",
    "typescript": "5.7.0"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "moduleFileExtensions": [
      "ts",
      "js"
    ],
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testMatch": [
      "**/*.test.ts"
    ]
  }
}


// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: src/domain/entities/Order.ts ===
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

// === ARCHIVO: src/domain/repositories/OrderRepository.ts ===
import { Order } from '../entities/Order';

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(order: Order): Promise<Order>;
    delete(id: string): Promise<void>;
    list(): Promise<Order[]>;
}
"

// === ARCHIVO: src/infrastructure/repositories/DynamoOrderRepository.ts ===
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

// === ARCHIVO: src/infrastructure/controllers/dto/CreateOrderDto.ts ===
import { IsString, IsNotEmpty, IsEnum, MaxLength, MinLength } from 'class-validator';
import { OrderStatus } from '../../../domain/entities/Order';

export class CreateOrderDto {
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description!: string;

  @IsEnum(OrderStatus, { message: 'El estado debe ser uno de: PENDING, PROCESSING, COMPLETED, CANCELLED' })
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  status!: OrderStatus;

  constructor(data: Partial<CreateOrderDto>) {
    if (data) {
      this.description = data.description;
      this.status = data.status;
    }
  }

  validar(): void {
    if (!this.description || this.description.trim().length === 0) {
      throw new Error('La descripción no puede estar en blanco');
    }
    if (this.description.length < 3) {
      throw new Error('La descripción debe tener al menos 3 caracteres');
    }
    if (this.description.length > 500) {
      throw new Error('La descripción no puede exceder 500 caracteres');
    }
    const estadosValidos = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
    if (!estadosValidos.includes(this.status)) {
      throw new Error('Estado inválido: debe ser PENDING, PROCESSING, COMPLETED o CANCELLED');
    }
  }

  toOrder(): { description: string; status: OrderStatus } {
    this.validar();
    return {
      description: this.description.trim(),
      status: this.status,
    };
  }
}

// === ARCHIVO: src/infrastructure/controllers/dto/UpdateOrderDto.ts ===
import { IsString, IsOptional, IsEnum, MaxLength, MinLength } from 'class-validator';
import { OrderStatus } from '../../../domain/entities/Order';

export class UpdateOrderDto {
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description?: string;

  @IsOptional()
  @IsEnum(OrderStatus, { message: 'El estado debe ser uno de: PENDING, PROCESSING, COMPLETED, CANCELLED' })
  status?: OrderStatus;

  constructor(data: Partial<UpdateOrderDto>) {
    if (data) {
      this.description = data.description;
      this.status = data.status;
    }
  }

  tieneCambios(): boolean {
    return !!this.description || !!this.status;
  }

  validar(): void {
    if (this.description !== undefined) {
      if (this.description.trim().length === 0) {
        throw new Error('La descripción no puede estar en blanco');
      }
      if (this.description.length < 3) {
        throw new Error('La descripción debe tener al menos 3 caracteres');
      }
      if (this.description.length > 500) {
        throw new Error('La descripción no puede exceder 500 caracteres');
      }
    }
    if (this.status !== undefined) {
      const estadosValidos = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
      if (!estadosValidos.includes(this.status)) {
        throw new Error('Estado inválido: debe ser PENDING, PROCESSING, COMPLETED o CANCELLED');
      }
    }
  }

  toOrderUpdate(): { description?: string; status?: OrderStatus } {
    this.validar();
    const updateData: { description?: string; status?: OrderStatus } = {};
    if (this.description !== undefined) {
      updateData.description = this.description.trim();
    }
    if (this.status !== undefined) {
      updateData.status = this.status;
    }
    return updateData;
  }
}

// === ARCHIVO: src/infrastructure/controllers/dto/OrderResponseDto.ts ===
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

// === ARCHIVO: src/infrastructure/controllers/OrderController.ts ===
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

// === ARCHIVO: src/infrastructure/config/dynamoConfig.ts ===
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

// === ARCHIVO: src/infrastructure/middlewares/errorHandler.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationError } from 'class-validator';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: Array<{
    field: string;
    messages: string[];
  }>;
  timestamp?: string;
  path?: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad request') {
    super(message, 400);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict') {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500);
  }
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  if (err instanceof AppError) {
    const response: ErrorResponse = {
      statusCode: err.statusCode,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(err.statusCode).json(response);
    return;
  }

  if (err.name === 'ValidationError') {
    const validationErrors = err as ValidationError;
    const formattedErrors = Object.values(validationErrors.constraints || {}).map(
      (message, index) => ({
        field: validationErrors.property || `error_${index}`,
        messages: [message],
      })
    );

    const response: ErrorResponse = {
      statusCode: 400,
      message: 'Validation failed',
      errors: formattedErrors,
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(400).json(response);
    return;
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    const response: ErrorResponse = {
      statusCode: 401,
      message: 'Unauthorized access',
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(401).json(response);
    return;
  }

  if (err.code === 'ConditionalCheckFailedException') {
    const response: ErrorResponse = {
      statusCode: 409,
      message: 'Resource already exists or condition not met',
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(409).json(response);
    return;
  }

  if (err.code === 'ResourceNotFoundException') {
    const response: ErrorResponse = {
      statusCode: 404,
      message: 'Resource not found in database',
      timestamp: new Date().toISOString(),
      path: req.path,
    };
    res.status(404).json(response);
    return;
  }

  const response: ErrorResponse = {
    statusCode: 500,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message,
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  res.status(500).json(response);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  const response: ErrorResponse = {
    statusCode: 404,
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString(),
    path: req.path,
  };
  res.status(404).json(response);
};

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  });
  
  next();
};

// === ARCHIVO: src/infrastructure/middlewares/validation.ts ===
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';

export function createValidationMiddleware<T extends object>(dtoClass: ClassConstructor<T>): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const dtoInstance = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoInstance, {
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        });

        if (errors.length > 0) {
            const formattedErrors = errors.map(error => ({
                field: error.property,
                constraints: error.constraints ? Object.values(error.constraints) : [],
            }));

            res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: formattedErrors,
            });
            return;
        }

        req.body = dtoInstance;
        next();
    };
}

// === ARCHIVO: src/app.module.ts ===
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

// === ARCHIVO: src/application/services/OrderService.ts ===
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

// === ARCHIVO: src/types/order.d.ts ===
export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface CreateOrderDto {
  description: string;
  status?: OrderStatus;
}

export interface UpdateOrderDto {
  description?: string;
  status?: OrderStatus;
}

export interface OrderResponseDto {
  id: string;
  description: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderListResponseDto {
  orders: OrderResponseDto[];
  total: number;
}

export interface OrderErrorDto {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

export type OrderStatusType = keyof typeof OrderStatus;

export function isValidOrderStatus(status: string): status is OrderStatus {
  return Object.values(OrderStatus).includes(status as OrderStatus);
}

export function getOrderStatusValues(): string[] {
  return Object.values(OrderStatus);
}

export function getOrderStatusDisplayName(status: OrderStatus): string {
  const displayNames: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'Pendiente',
    [OrderStatus.IN_PROGRESS]: 'En Progreso',
    [OrderStatus.COMPLETED]: 'Completado',
    [OrderStatus.CANCELLED]: 'Cancelado',
  };
  return displayNames[status];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface OrderQueryParams extends PaginationParams {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
}

export interface OrderFilterOptions {
  status?: OrderStatus;
  createdAfter?: Date;
  createdBefore?: Date;
}

export interface OrderValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateOrderDescription(description: string): OrderValidationResult {
  const errors: string[] = [];
  
  if (!description || description.trim().length === 0) {
    errors.push('La descripción es requerido');
  }
  
  if (description && description.length < 3) {
    errors.push('La descripción debe tener al menos 3 caracteres');
  }
  
  if (description && description.length > 500) {
    errors.push('La descripción no puede exceder 500 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateOrderStatus(status: string): OrderValidationResult {
  const errors: string[] = [];
  
  if (!status) {
    errors.push('El estado es requerido');
  } else if (!isValidOrderStatus(status)) {
    errors.push(`Estado inválido: ${status}. Estados válidos: ${getOrderStatusValues().join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export interface CreateOrderResponse {
  success: boolean;
  order?: OrderResponseDto;
  error?: string;
}

export interface UpdateOrderResponse {
  success: boolean;
  order?: OrderResponseDto;
  error?: string;
}

export interface DeleteOrderResponse {
  success: boolean;
  message: string;
}

export interface GetOrderResponse {
  success: boolean;
  order?: OrderResponseDto;
  error?: string;
}

export interface ListOrdersResponse {
  success: boolean;
  orders: OrderResponseDto[];
  total: number;
  page?: number;
  limit?: number;
}

// === ARCHIVO: .env.example ===
# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Configuración de DynamoDB Local (desarrollo)
# Usa estos valores para desarrollo local con DynamoDB Local
DYNAMODB_ENDPOINT=http://localhost:8000
DYNAMODB_REGION=us-east-1
DYNAMODB_TABLE_NAME=orders
AWS_ACCESS_KEY_ID=local
AWS_SECRET_ACCESS_KEY=local

# Configuración de DynamoDB Production (descomenta para producción)
# DYNAMODB_REGION=us-east-1
# DYNAMODB_TABLE_NAME=orders-prod
# AWS_ACCESS_KEY_ID=tu_access_key
# AWS_SECRET_ACCESS_KEY=tu_secret_key

# Configuración de Swagger
SWAGGER_PATH=/api-docs
SWAGGER_TITLE=Order CRUD API
SWAGGER_DESCRIPTION=API REST para gestión de órdenes sobre DynamoDB
SWAGGER_VERSION=1.0.0

# Configuración de Logging
LOG_LEVEL=info
LOG_FORMAT=json

# Configuración de CORS
CORS_ORIGIN=*
CORS_METHODS=GET,POST,PUT,DELETE,OPTIONS
CORS_HEADERS=Content-Type,Authorization

# Configuración de Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Configuración de Timeout
REQUEST_TIMEOUT_MS=30000

# Configuración de Retry
DYNAMODB_MAX_RETRIES=3
DYNAMODB_RETRY_DELAY_MS=100

# Configuración de Circuit Breaker
CIRCUIT_BREAKER_THRESHOLD=5
CIRCUIT_BREAKER_TIMEOUT_MS=60000

// === ARCHIVO: swagger.json ===
{
  "openapi": "3.0.3",
  "info": {
    "title": "Order CRUD API",
    "description": "API REST para gestión de órdenes sobre DynamoDB. Permite crear, leer, actualizar y eliminar órdenes con validación de entradas y manejo de errores robusto.",
    "version": "1.0.0",
    "contact": {
      "name": "API Support",
      "email": "support@example.com"
    },
    "license": {
      "name": "ISC",
      "url": "https://opensource.org/licenses/ISC"
    }
  },
  "servers": [
    {
      "url": "http://localhost:3000",
      "description": "Servidor de desarrollo"
    }
  ],
  "tags": [
    {
      "name": "Orders",
      "description": "Operaciones CRUD para la gestión de órdenes"
    }
  ],
  "paths": {
    "/orders": {
      "get": {
        "tags": ["Orders"],
        "summary": "Listar todas las órdenes",
        "description": "Obtiene una lista de todas las órdenes almacenadas en DynamoDB. Soporta paginación mediante parámetros de query.",
        "operationId": "listOrders",
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "description": "Número de página para paginación (comienza en 1)",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 1,
              "minimum": 1
            }
          },
          {
            "name": "limit",
            "in": "query",
            "description": "Cantidad de elementos por página",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 10,
              "minimum": 1,
              "maximum": 100
            }
          },
          {
            "name": "status",
            "in": "query",
            "description": "Filtrar órdenes por estado",
            "required": false,
            "schema": {
              "type": "string",
              "enum": ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de órdenes obtenida exitosamente",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/OrderListResponse"
                }
              }
            }
          },
          "500": {
            "description": "Error interno del servidor",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      "post": {
        "tags": ["Orders"],
        "summary": "Crear una nueva orden",
        "description": "Crea una nueva orden en DynamoDB. El identificador único se genera automáticamente.",
        "operationId": "createOrder",
        "requestBody": {
          "description": "Datos de la orden a crear",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateOrderDto"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Orden creada exitosamente",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/OrderResponse"
                }
              }
            }
          },
          "400": {
            "description": "Solicitud inválida - datos de entrada inválidos",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ValidationErrorResponse"
                }
              }
            }
          },
          "500": {
            "description": "Error interno del servidor",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/orders/{id}": {
      "get": {
        "tags": ["Orders"],
        "summary": "Obtener una orden por ID",
        "description": "Recupera los detalles de una orden específica usando su identificador único.",
        "operationId": "getOrder",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Identificador único de la orden",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Orden encontrada exitosamente",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/OrderResponse"
                }
              }
            }
          },
          "404": {
            "description": "Orden no encontrada",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "500": {
            "description": "Error interno del servidor",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": ["Orders"],
        "summary": "Actualizar una orden",
        "description": "Actualiza los datos de una orden existente. Se pueden actualizar la descripción y/o el estado.",
        "operationId": "updateOrder",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Identificador único de la orden",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "description": "Datos de la orden a actualizar",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateOrderDto"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Orden actualizada exitosamente",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/OrderResponse"
                }
              }
            }
          },
          "400": {
            "description": "Solicitud inválida - datos de entrada inválidos",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ValidationErrorResponse"
                }
              }
            }
          },
          "404": {
            "description": "Orden no encontrada",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "500": {
            "description": "Error interno del servidor",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": ["Orders"],
        "summary": "Eliminar una orden",
        "description": "Elimina una orden existente de DynamoDB usando su identificador único.",
        "operationId": "deleteOrder",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "Identificador único de la orden",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Orden eliminada exitosamente"
          },
          "404": {
            "description": "Orden no encontrada",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "500": {
            "description": "Error interno del servidor",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "OrderStatus": {
        "type": "string",
        "enum": ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
        "description": "Estado de la orden"
      },
      "CreateOrderDto": {
        "type": "object",
        "required": ["description"],
        "properties": {
          "description": {
            "type": "string",
            "minLength": 3,
            "maxLength": 500,
            "description": "Descripción de la orden"
          },
          "status": {
            "$ref": "#/components/schemas/OrderStatus",
            "description": "Estado de la orden (opcional, por defecto PENDING)",
            "default": "PENDING"
          }
        },
        "example": {
          "description": "Orden de compra de materiales",
          "status": "PENDING"
        }
      },
      "UpdateOrderDto": {
        "type": "object",
        "properties": {
          "description": {
            "type": "string",
            "minLength": 3,
            "maxLength": 5500,
            "description": "Nueva descripción de la orden"
          },
          "status": {
            "$ref": "#/components/schemas/OrderStatus",
            "description": "Nuevo estado de la orden"
          }
        },
        "example": {
          "description": "Orden de compra actualizada",
          "status": "IN_PROGRESS"
        }
      },
      "OrderResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid",
            "description": "Identificador único de la orden"
          },
          "description": {
            "type": "string",
            "description": "Descripción de la orden"
          },
          "status": {
            "$ref": "#/components/schemas/OrderStatus",
            "description": "Estado actual de la orden"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "description": "Fecha de creación de la orden"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "description": "Fecha de última actualización de la orden"
          }
        },
        "example": {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "description": "Orden de compra de materiales",
          "status": "PENDING",
          "createdAt": "2024-01-15T10:30:00.000Z",
          "updatedAt": "2024-01-15T10:30:00.000Z"
        }
      },
      "OrderListResponse": {
        "type": "object",
        "properties": {
          "orders": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OrderResponse"
            },
            "description": "Lista de órdenes"
          },
          "total": {
            "type": "integer",
            "description": "Total de órdenes disponibles"
          },
          "page": {
            "type": "integer",
            "description": "Página actual"
          },
          "limit": {
            "type": "integer",
            "description": "Límite de elementos por página"
          }
        },
        "example": {
          "orders": [
            {
              "id": "550e8400-e29b-41d4-a716-446655440000",
              "description": "Orden de compra de materiales",
              "status": "PENDING",
              "createdAt": "2024-01-15T10:30:00.000Z",
              "updatedAt": "2024-01-15T10:30:00.000Z"
            }
          ],
          "total": 1,
          "page": 1,
          "limit": 10
        }
      },
      "ErrorResponse": {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer",
            "description": "Código de estado HTTP"
          },
          "message": {
            "type": "string",
            "description": "Mensaje de error"
          },
          "error": {
            "type": "string",
            "description": "Tipo de error"
          },
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Marca de tiempo del error"
          },
          "path": {
            "type": "string",
            "description": "Ruta de la solicitud que causó el error"
          }
        },
        "example": {
          "statusCode": 404,
          "message": "Orden no encontrada",
          "error": "Not Found",
          "timestamp": "2024-01-15T10:30:00.000Z",
          "path": "/orders/550e8400-e29b-41d4-a716-446655440000"
        }
      },
      "ValidationErrorResponse": {
        "type": "object",
        "properties": {
          "statusCode": {
            "type": "integer",
            "description": "Código de estado HTTP"
          },
          "message": {
            "type": "string",
            "description": "Mensaje de error de validación"
          },
          "error": {
            "type": "string",
            "description": "Tipo de error"
          },
          "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Marca de tiempo del error"
          },
          "path": {
            "type": "string",
            "description": "Ruta de la solicitud que causó el error"
          },
          "validationErrors": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "field": {
                  "type": "string"
                },
                "message": {
                  "type": "string"
                }
              }
            },
            "description": "Lista de errores de validación"
          }
        },
        "example": {
          "statusCode": 400,
          "message": "Error de validación",
          "error": "Bad Request",
          "timestamp": "2024-01-15T10:30:00.000Z",
          "path": "/orders",
          "validationErrors": [
            {
              "field": "description",
              "message": "La descripción debe tener al menos 3 caracteres"
            }
          ]
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "description": "Token de autenticación JWT"
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ]
}

// === ARCHIVO: infra/src/main/java/Application.java ===
// El stack proporcionado es Terraform/AWS y no requiere una clase Application.java.
// Este archivo no aplica en un proyecto de infraestructura como código.
// En su lugar, el punto de entrada es el directorio raíz donde se ejecuta `terraform apply`.

// === ARCHIVO: infra/README.md ===
# Módulo de Infraestructura - CRUD de Órdenes en DynamoDB

Este módulo define la infraestructura necesaria para el sistema de gestión de órdenes sobre DynamoDB.

## Recursos Definidos

### Tabla DynamoDB
- **orders_table**: Almacena las órdenes del sistema con los siguientes atributos:
  - `order_id` (PK) - Identificador único de la orden
  - `description` - Descripción de la orden
  - `status` - Estado de la orden (PENDING, PROCESSING, COMPLETED, CANCELLED)
  - `created_at` - Fecha de creación (timestamp)
  - `updated_at` - Fecha de última actualización (timestamp)

### Índice Secundario Global
- `status_created_index` - Permite consultas por estado y fecha de creación

### Políticas IAM
- `dynamodb_read_policy` - Permisos de lectura sobre la tabla
- `dynamodb_write_policy` - Permisos de escritura sobre la tabla
- `dynamodb_full_access` - Acceso completo para operaciones administrativas

## Uso del Módulo

```hcl
module "infra" {
  source = "./infra"

  aws_region   = "us-east-1"
  environment = "dev"
  table_name   = "orders"
}
```

## Validación Local

Para validar la configuración Terraform antes de aplicar:

```bash
cd infra
terraform init
terraform validate
terraform plan -var-file="../environments/dev/terraform.tfvars"
```

## Variables de Entrada

| Variable | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| aws_region | string | us-east-1 | Región de AWS |
| environment | string | dev | Entorno de despliegue |
| table_name | string | orders | Nombre de la tabla DynamoDB |
| billing_mode | string | PAY_PER_REQUEST | Modo de facturación |
| enable_deletion_protection | bool | false | Habilitar protección contra eliminación |

## Outputs

| Output | Descripción |
|--------|-------------|
| table_name | Nombre de la tabla creada |
| table_arn | ARN de la tabla DynamoDB |
| table_id | ID único de la tabla |
| read_policy_arn | ARN de la política de lectura |
| write_policy_arn | ARN de la política de escritura |

## Requisitos

- Terraform >= 1.9.5
- AWS Provider >= 5.64.0
- Credenciales de AWS configuradas localmente o mediante IAM Role

## Notas de Seguridad

- La tabla usa encriptación por defecto con AWS managed keys
- Se recomienda habilitar deletion_protection en entornos de producción
- Los índices GSI se facturan por capacidad bajo demanda
- Las políticas IAM siguen el principio de mínimo privilegio

// === ARCHIVO: infra/pom.xml ===
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>terraform-aws-project</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>
    
    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <version>3.1.0</version>
                <configuration>
                    <executable>terraform</executable>
                    <arguments>
                        <argument>init</argument>
                    </arguments>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>

// === ARCHIVO: infra/providers.tf ===
# Configuración de providers para Terraform
# Este archivo declara los providers necesarios para desplegar la infraestructura en AWS
# y establece las versiones mínimas requeridas para garantizar compatibilidad.

terraform {
  required_version = "~> 1.9.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.64.0"
    }
  }
}

# Provider principal para AWS
# Configura el acceso a la región especificada y aplica etiquetas globales a todos los recursos.
provider "aws" {
  region = var.aws_region
  
  # Etiquetado consistente para todos los recursos creados
  default_tags {
    tags = {
      Environment = var.environment
      Project     = var.project_name
      ManagedBy   = "Terraform"
      Repository  = var.repository_url
    }
  }
}

# Variables de entrada para la configuración del provider AWS
# Estas variables permiten personalizar el despliegue según el entorno.
variable "aws_region" {
  description = "Región de AWS donde se desplegará la infraestructura"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetado de recursos"
  type        = string
  default     = "order-management"
}

variable "repository_url" {
  description = "URL del repositorio de código fuente"
  type        = string
  default     = "https://github.com/example/order-management"
}

# Configuración adicional para habilitar características específicas de AWS
# como DynamoDB Streams o Point-in-Time Recovery si son requeridas.
provider "aws" {
  alias  = "dynamodb_streams"
  region = var.aws_region
  
  # Habilita configuraciones específicas para DynamoDB
  default_tags {
    tags = {
      Service = "DynamoDB"
    }
  }
}

# Outputs útiles para otros módulos o despliegues
# Proporciona información relevante como la región configurada.
output "aws_region" {
  description = "Región de AWS configurada"
  value       = var.aws_region
}

output "environment" {
  description = "Entorno de despliegue"
  value       = var.environment
}

// === ARCHIVO: infra/variables.tf ===
# Variables globales para la configuración de la infraestructura
# Estas variables son utilizadas por múltiples módulos y recursos.

variable "aws_region" {
  description = "Región de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser uno de: dev, staging, prod."
  }
}

variable "project_name" {
  description = "Nombre del proyecto para etiquetado de recursos"
  type        = string
  default     = "order-management"
}

variable "repository_url" {
  description = "URL del repositorio de código fuente"
  type        = string
  default     = "https://github.com/example/order-management"
}

# Variables específicas para la tabla DynamoDB de órdenes
variable "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "orders"
}

variable "dynamodb_billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.dynamodb_billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST."
  }
}

variable "dynamodb_read_capacity" {
  description = "Capacidad de lectura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "Capacidad de escritura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
  default     = "order_id"
}

variable "dynamodb_enable_stream" {
  description = "Habilita DynamoDB Streams para la tabla"
  type        = bool
  default     = false
}

variable "dynamodb_stream_view_type" {
  description = "Tipo de vista para DynamoDB Streams (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.dynamodb_stream_view_type)
    error_message = "El tipo de vista debe ser uno de: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES."
  }
}

variable "dynamodb_enable_point_in_time_recovery" {
  description = "Habilita Point-in-Time Recovery para la tabla DynamoDB"
  type        = bool
  default     = true
}

variable "dynamodb_ttl_attribute" {
  description = "Atributo para Time-to-Live (TTL) en la tabla DynamoDB"
  type        = string
  default     = "expiration_time"
}

variable "dynamodb_ttl_enabled" {
  description = "Habilita Time-to-Live (TTL) para la tabla DynamoDB"
  type        = bool
  default     = false
}

# Variables para políticas IAM
variable "iam_policy_name" {
  description = "Nombre de la política IAM para acceso a DynamoDB"
  type        = string
  default     = "dynamodb-order-access-policy"
}

variable "iam_role_name" {
  description = "Nombre del rol IAM para acceso a DynamoDB"
  type        = string
  default     = "dynamodb-order-access-role"
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
# Variables de entrada para el módulo DynamoDB
# Estas variables permiten configurar la tabla DynamoDB según los requisitos del proyecto.

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
  validation {
    condition     = contains(["PROVISIONED", "PAY_PER_REQUEST"], var.billing_mode)
    error_message = "El modo de facturación debe ser PROVISIONED o PAY_PER_REQUEST."
  }
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
  default     = "order_id"
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB"
  type        = string
  default     = ""
}

variable "attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "order_id"
      type = "S"
    }
  ]
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name               = string
    hash_key           = string
    range_key          = string
    projection_type    = string
    read_capacity      = number
    write_capacity     = number
    non_key_attributes = list(string)
  }))
  default = []
}

variable "local_secondary_indexes" {
  description = "Lista de índices secundarios locales para la tabla DynamoDB"
  type = list(object({
    name               = string
    range_key          = string
    projection_type    = string
    non_key_attributes = list(string)
  }))
  default = []
}

variable "enable_stream" {
  description = "Habilita DynamoDB Streams para la tabla"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista para DynamoDB Streams (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
  validation {
    condition     = contains(["KEYS_ONLY", "NEW_IMAGE", "OLD_IMAGE", "NEW_AND_OLD_IMAGES"], var.stream_view_type)
    error_message = "El tipo de vista debe ser uno de: KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES."
  }
}

variable "enable_point_in_time_recovery" {
  description = "Habilita Point-in-Time Recovery para la tabla DynamoDB"
  type        = bool
  default     = true
}

variable "ttl_attribute" {
  description = "Atributo para Time-to-Live (TTL) en la tabla DynamoDB"
  type        = string
  default     = "expiration_time"
}

variable "ttl_enabled" {
  description = "Habilita Time-to-Live (TTL) para la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Etiquetas adicionales para la tabla DynamoDB"
  type        = map(string)
  default     = {}
}

variable "server_side_encryption_enabled" {
  description = "Habilita el cifrado del lado del servidor para la tabla DynamoDB"
  type        = bool
  default     = true
}

variable "server_side_encryption_kms_key_arn" {
  description = "ARN de la clave KMS para el cifrado del lado del servidor"
  type        = string
  default     = ""
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.64.0"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "orders-dynamodb-crud"
      ManagedBy   = "terraform"
      Owner       = "platform-team"
    }
  }

  skip_credentials_validation = var.skip_credentials_validation
  skip_requesting_account_id  = var.skip_requesting_account_id
  skip_metadata_api_check     = var.skip_metadata_api_check

  dynamic "endpoints" {
    for_each = var.custom_endpoints
    content {
      name = endpoints.key
      url  = endpoints.value
    }
  }
}

variable "aws_region" {
  description = "Región de AWS donde se desplegará la infraestructura"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "El entorno debe ser uno de: dev, staging, prod"
  }
}

variable "skip_credentials_validation" {
  description = "Omitir validación de credenciales (útil para desarrollo local)"
  type        = bool
  default     = false
}

variable "skip_requesting_account_id" {
  description = "Omitir solicitud de account ID"
  type        = bool
  default     = false
}

variable "skip_metadata_api_check" {
  description = "Omitir verificación de API de metadatos"
  type        = bool
  default     = false
}

variable "custom_endpoints" {
  description = "Endpoints personalizados para servicios AWS"
  type        = map(string)
  default     = {}
}

// === ARCHIVO: infra/main.tf ===
terraform {
  # Configuración del backend para almacenar el estado
  backend "local" {
    path = "terraform.tfstate"
  }
}

# Módulo principal de DynamoDB para órdenes
module "dynamodb_orders" {
  source = "./modules/dynamodb"

  table_name              = var.table_name
  billing_mode            = var.billing_mode
  environment             = var.environment
  enable_deletion_protection = var.enable_deletion_protection

  # Configuración de atributos de la tabla
  attribute_definitions = [
    {
      attribute_name = "order_id"
      attribute_type = "S"
    },
    {
      attribute_name = "status"
      attribute_type = "S"
    },
    {
      attribute_name = "created_at"
      attribute_type = "N"
    }
  ]

  # Clave primaria de la tabla
  hash_key = "order_id"

  # Configuración de capacidad
  read_capacity  = var.read_capacity
  write_capacity = var.write_capacity

  # Habilitar transmisión de streams para captura de cambios
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"

  # TTL para limpieza automática de registros si es necesario
  ttl_enabled = var.ttl_enabled
  ttl_attribute_name = var.ttl_attribute_name

  # Etiquetas adicionales específicas del proyecto
  tags = merge(
    var.common_tags,
    {
      Component = "dynamodb-table"
      Tier      = "data"
    }
  )
}

# Política IAM para acceso de lectura a la tabla
resource "aws_iam_policy" "dynamodb_read_policy" {
  name        = "${var.table_name}-read-policy-${var.environment}"
  description = "Política de lectura para la tabla de órdenes en DynamoDB"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:DescribeTable"
        ]
        Resource = [
          module.dynamodb_orders.table_arn,
          "${module.dynamodb_orders.table_arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:DescribeStream",
          "dynamodb:GetRecords",
          "dynamodb:GetShardIterator"
        ]
        Resource = module.dynamodb_orders.stream_arn
      }
    ]
  })

  tags = var.common_tags
}

# Política IAM para acceso de escritura a la tabla
resource "aws_iam_policy" "dynamodb_write_policy" {
  name        = "${var.table_name}-write-policy-${var.environment}"
  description = "Política de escritura para la tabla de órdenes en DynamoDB"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ]
        Resource = module.dynamodb_orders.table_arn
      }
    ]
  })

  tags = var.common_tags
}

# Política de acceso completo (solo para administradores)
resource "aws_iam_policy" "dynamodb_admin_policy" {
  count       = var.environment == "prod" ? 1 : 0
  name        = "${var.table_name}-admin-policy-${var.environment}"
  description = "Política de administrador para la tabla de órdenes en DynamoDB"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:*"
        ]
        Resource = [
          module.dynamodb_orders.table_arn,
          "${module.dynamodb_orders.table_arn}/index/*"
        ]
      }
    ]
  })

  tags = var.common_tags
}

# Grupo de recursos para organización
resource "aws_resourcegroups_group" "orders_rg" {
  name = "orders-dynamodb-rg-${var.environment}"

  resource_query {
    query = jsonencode({
      ResourceTypeFilters = ["AWS:DynamoDB:Table"]
      TagFilter = [
        {
          Key    = "Component"
          Values = ["dynamodb-table"]
        }
      ]
    })
  }

  tags = var.common_tags
}

# Configuración de backups puntuales (solo en prod)
resource "aws_backup_plan" "orders_backup" {
  count = var.environment == "prod" ? 1 : 0
  name  = "orders-backup-plan-${var.environment}"

  rule {
    name                = "daily-backup"
    schedule            = "cron(0 5 ? * * *)"
    target_vault_name   = aws_backup_vault.orders_vault[0].name
    start_window        = 60
    completion_window   = 180
    copy_action {
      destination_vault_arn = var.backup_vault_arn
    }
  }

  rule {
    name                = "monthly-backup"
    schedule            = "cron(0 6 1 * ?)"
    target_vault_name   = aws_backup_vault.orders_vault[0].name
    start_window        = 60
    completion_window   = 300
    lifecycle {
      cold_storage_after = 30
      delete_after       = 365
    }
  }
}

resource "aws_backup_vault" "orders_vault" {
  count = var.environment == "prod" ? 1 : 0
  name  = "orders-backup-vault-${var.environment}"

  tags = var.common_tags
}

resource "aws_backup_selection" "orders_backup_selection" {
  count      = var.environment == "prod" ? 1 : 0
  name       = "orders-backup-selection-${var.environment}"
  plan_id    = aws_backup_plan.orders_backup[0].id
  resource_id = module.dynamodb_orders.table_id

  condition {
    type      = "STRINGEQUALS"
    attribute = "aws:ResourceTag/Component"
    value     = "dynamodb-table"
  }
}

# Variables específicas del módulo
variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
  default     = "orders"
  validation {
    condition     = length(var.table_name) >= 3 && length(var.table_name) <= 255
    error_message = "El nombre de la tabla debe tener entre 3 y 255 caracteres"
  }
}

variable "billing_mode" {
  description = "Modo de facturación de la tabla (PAY_PER_REQUEST o PROVISIONED)"
  type        = string
  default     = "PAY_PER_REQUEST"
  validation {
    condition     = contains(["PAY_PER_REQUEST", "PROVISIONED"], var.billing_mode)
    error_message = "El modo de facturación debe ser PAY_PER_REQUEST o PROVISIONED"
  }
}

variable "read_capacity" {
  description = "Capacidad de lectura para modo PROVISIONED"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura para modo PROVISIONED"
  type        = number
  default     = 5
}

variable "enable_deletion_protection" {
  description = "Habilitar protección contra eliminación de la tabla"
  type        = bool
  default     = false
}

variable "ttl_enabled" {
  description = "Habilitar TTL para eliminación automática"
  type        = bool
  default     = false
}

variable "ttl_attribute_name" {
  description = "Nombre del atributo TTL"
  type        = string
  default     = "expires_at"
}

variable "common_tags" {
  description = "Etiquetas comunes para todos los recursos"
  type        = map(string)
  default     = {}
}

variable "backup_vault_arn" {
  description = "ARN del vault de backup para copiar backups"
  type        = string
  default     = ""
}

// === ARCHIVO: infra/outputs.tf ===
# Outputs de la infraestructura principal
# Exporta los valores necesarios para que otros componentes consuman los recursos creados

# Output del módulo DynamoDB - ARN de la tabla de órdenes
output "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.dynamodb_table_arn
}

# Output del módulo DynamoDB - Nombre de la tabla
output "dynamodb_table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.dynamodb_table_name
}

# Output del módulo DynamoDB - ID de la tabla
output "dynamodb_table_id" {
  description = "ID de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.dynamodb_table_id
}

# Output del bucket S3 para state remoto (si está configurado)
output "s3_bucket_name" {
  description = "Nombre del bucket S3 para almacenar el estado de Terraform"
  value       = try(module.s3_state[0].bucket_name, null)
}

# Output del bucket S3 - ARN
output "s3_bucket_arn" {
  description = "ARN del bucket S3 para almacenar el estado de Terraform"
  value       = try(module.s3_state[0].bucket_arn, null)
}

# Output de la región configurada
output "aws_region" {
  description = "Región de AWS donde se despliega la infraestructura"
  value       = var.aws_region
}

# Output del entorno
output "environment" {
  description = "Entorno de despliegue (dev, staging, prod)"
  value       = var.environment
}

# Output del nombre del proyecto
output "project_name" {
  description = "Nombre del proyecto"
  value       = var.project_name
}

# Output combinado para facilitar el consumo desde otros módulos
output "order_service_info" {
  description = "Información consolidada del servicio de órdenes"
  value = {
    table_arn  = module.dynamodb.dynamodb_table_arn
    table_name = module.dynamodb.dynamodb_table_name
    region     = var.aws_region
    environment = var.environment
  }
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Variables específicas del entorno de desarrollo
# Estas valores se cargan automáticamente cuando Terraform ejecuta en este directorio

# Configuración regional de AWS-aws_region = "us-east-1"

# Nombre del proyecto - usado para identificar recursos en AWS
project_name = "order-crud-dynamodb"

# Entorno de despliegue - define el ciclo de vida de esta infraestructura
environment = "dev"

# Habilitar características de depuración y logging detallado
enable_debug = true

# Configuración de la tabla DynamoDB
dashdb_table_name = "orders"

# Modo de facturación de DynamoDB - PAY_PER_REQUEST para desarrollo
dynamodb_billing_mode = "PAY_PER_REQUEST"

# Habilitar punto de acceso de Stream para DynamoDB (para integración con Lambda)
dynamodb_enable_stream = true

# Configuración de capacidad read/write (solo aplica en modo PROVISIONED)
dynamodb_read_capacity  = 5
dynamodb_write_capacity = 5

# Habilitar eliminación continua (soft delete) - recomendado en producción
enable_deletion_protection = false

# Configuración de replicate_to_regions para alta disponibilidad (solo producción)
# En desarrollo no necesitamos replicación cross-region
replicate_to_regions = []

# Tags estándar aplicados a todos los recursos
common_tags = {
  Environment = "development"
  Project     = "order-crud-dynamodb"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
}

# Tags específicos para recursos críticos
critical_resource_tags = {
  Compliance = "SOC2"
  Backup     = "required"
}

# Configuración de logging
enable_cloudtrail     = false
log_retention_days    = 7

# Configuración de red - en desarrollo usamos valores por defecto
vpc_cidr_block        = "10.0.0.0/16"
availability_zones    = ["us-east-1a", "us-east-1b"]

# Habilitar endpoints privados de VPC (recomendado en prod, no necesario en dev)
enable_vpc_endpoints = false

# Configuración de seguridad adicional
enable_deletion_protection = false
force_ssl_only             = true

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
resource "aws_dynamodb_table" "orders" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  hash_key       = var.partition_key_name
  range_key      = var.sort_key_name
  stream_enabled = var.enable_streams
  stream_view_type = var.enable_streams ? var.stream_view_type : null

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.gsis
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = try(global_secondary_index.value.range_key, null)
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = var.billing_mode == "PROVISIONED" ? global_secondary_index.value.read_capacity : null
      write_capacity  = var.billing_mode == "PROVISIONED" ? global_secondary_index.value.write_capacity : null
    }
  }

  dynamic "local_secondary_index" {
    for_each = var.lsis
    content {
      name       = local_secondary_index.value.name
      range_key  = local_secondary_index.value.range_key
      projection_type = "KEYS_ONLY"
    }
  }

  server_side_encryption {
    enabled     = var.server_side_encryption
    kms_key_arn = var.kms_key_arn
  }

  point_in_time_recovery {
    enabled = var.point_in_time_recovery
  }

  ttl {
    enabled        = var.ttl_enabled
    attribute_name = var.ttl_attribute_name
  }

  dynamic "replica" {
    for_each = var.replica_regions
    content {
      region_name = replica.value
    }
  }

  tags = merge(
    var.common_tags,
    {
      "Name"        = var.table_name
      "Environment" = var.environment
      "ManagedBy"   = "Terraform"
      "Project"     = var.project_name
    }
  )

  lifecycle {
    ignore_changes = [tags]
  }
}

resource "aws_dynamodb_table_replica" "orders_replicas" {
  count = length(var.replica_regions) > 0 ? 1 : 0
  provider = "${var.provider_alias}"

  table_name = aws_dynamodb_table.orders.name

  lifecycle {
    ignore_changes = [table_class]
  }
}

resource "aws_kms_key" "dynamodb_encryption" {
  count                   = var.create_kms_key && var.server_side_encryption ? 1 : 0
  description             = "KMS key for DynamoDB table ${var.table_name} encryption"
  deletion_window_in_days = 10
  enable_key_rotation     = var.enable_key_rotation

  tags = merge(
    var.common_tags,
    {
      "Name"        = "${var.table_name}-kms-key"
      "Environment" = var.environment
      "ManagedBy"   = "Terraform"
      "Project"     = var.project_name
    }
  )
}

resource "aws_kms_alias" "dynamodb_encryption_alias" {
  count          = var.create_kms_key && var.server_side_encryption ? 1 : 0
  name           = "alias/${var.table_name}-encryption"
  target_key_id  = aws_kms_key.dynamodb_encryption[0].key_id
}

resource "aws_iam_policy" "dynamodb_access" {
  count       = var.create_iam_policy ? 1 : 0
  name        = "${var.table_name}-access-policy"
  description = "IAM policy for accessing DynamoDB table ${var.table_name}"

  policy = jsonencode({
    "Version" = "2012-10-17"",
    "Statement" = [
      {
        "Sid"    = "AllowDynamoDBAccess"",
        "Effect" = "Allow",
        "Action" = var.policy_actions,
        "Resource" = [
          aws_dynamodb_table.orders.arn,
          "${aws_dynamodb_table.orders.arn}/index/*"
        ]
      }
    ]
  })

  tags = merge(
    var.common_tags,
    {
      "Name"        = "${var.table_name}-access-policy"
      "Environment" = var.environment
      "ManagedBy"   = "Terraform"
      "Project"     = var.project_name
    }
  )
}

resource "aws_dynamodb_resource_policy" "table_policy" {
  count      = var.resource_policy != null ? 1 : 0
  table_name = aws_dynamodb_table.orders.name

  policy = var.resource_policy

  depends_on = [aws_dynamodb_table.orders]
}

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
output "table_name" {
  description = "The name of the DynamoDB table"
  value       = aws_dynamodb_table.orders.name
}

output "table_arn" {
  description = "The ARN of the DynamoDB table"
  value       = aws_dynamodb_table.orders.arn
}

output "table_id" {
  description = "The ID of the DynamoDB table"
  value       = aws_dynamodb_table.orders.id
}

output "table_stream_arn" {
  description = "The ARN of the DynamoDB table stream (if enabled)"
  value       = try(aws_dynamodb_table.orders.stream_arn, null)
}

output "table_stream_label" {
  description = "The label of the DynamoDB table stream"
  value       = try(aws_dynamodb_table.orders.stream_label, null)
}

output "table_size_bytes" {
  description = "The size of the DynamoDB table in bytes"
  value       = aws_dynamodb_table.orders.size_bytes
}

output "table_item_count" {
  description = "The number of items in the DynamoDB table"
  value       = aws_dynamodb_table.orders.item_count
}

output "table_status" {
  description = "The current status of the DynamoDB table"
  value       = aws_dynamodb_table.orders.status
}

output "table_endpoint" {
  description = "The DynamoDB table endpoint URL"
  value       = "https://dynamodb.${var.region}.amazonaws.com"
}

output "kms_key_arn" {
  description = "The ARN of the KMS key used for encryption (if created)"
  value       = try(aws_kms_key.dynamodb_encryption[0].arn, var.kms_key_arn)
}

output "iam_policy_arn" {
  description = "The ARN of the IAM policy for table access (if created)"
  value       = try(aws_iam_policy.dynamodb_access[0].arn, null)
}

output "global_secondary_index_names" {
  description = "List of global secondary index names"
  value       = [for gsi in aws_dynamodb_table.orders.global_secondary_index : gsi.name]
}

output "local_secondary_index_names" {
  description = "List of local secondary index names"
  value       = [for lsi in aws_dynamodb_table.orders.local_secondary_index : lsi.name]
}

output "attribute_definitions" {
  description = "List of attribute definitions for the table"
  value       = [for attr in aws_dynamodb_table.orders.attribute : {
    name = attr.name
    type = attr.type
  }]
}

output "replica_regions" {
  description = "List of replica regions (if configured)"
  value       = var.replica_regions
}

output "billing_mode" {
  description = "The billing mode of the table"
  value       = aws_dynamodb_table.orders.billing_mode
}

output "partition_key" {
  description = "The partition key of the table"
  value = {
    name = var.partition_key_name
    type = [for attr in aws_dynamodb_table.orders.attribute : attr.type if attr.name == var.partition_key_name][0]
  }
}

output "sort_key" {
  description = "The sort key of the table (if configured)"
  value       = var.sort_key_name != null ? {
    name = var.sort_key_name
    type = [for attr in aws_dynamodb_table.orders.attribute : attr.type if attr.name == var.sort_key_name][0]
  } : null
}

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
