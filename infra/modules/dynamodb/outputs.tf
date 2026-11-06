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