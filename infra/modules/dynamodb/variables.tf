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