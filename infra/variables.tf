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