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