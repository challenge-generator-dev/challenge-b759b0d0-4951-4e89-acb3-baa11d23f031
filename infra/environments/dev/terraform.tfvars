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