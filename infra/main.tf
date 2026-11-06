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