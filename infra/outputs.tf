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