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