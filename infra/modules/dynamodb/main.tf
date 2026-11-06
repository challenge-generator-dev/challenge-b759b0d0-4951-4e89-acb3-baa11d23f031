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