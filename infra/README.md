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