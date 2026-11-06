export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface CreateOrderDto {
  description: string;
  status?: OrderStatus;
}

export interface UpdateOrderDto {
  description?: string;
  status?: OrderStatus;
}

export interface OrderResponseDto {
  id: string;
  description: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface OrderListResponseDto {
  orders: OrderResponseDto[];
  total: number;
}

export interface OrderErrorDto {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

export type OrderStatusType = keyof typeof OrderStatus;

export function isValidOrderStatus(status: string): status is OrderStatus {
  return Object.values(OrderStatus).includes(status as OrderStatus);
}

export function getOrderStatusValues(): string[] {
  return Object.values(OrderStatus);
}

export function getOrderStatusDisplayName(status: OrderStatus): string {
  const displayNames: Record<OrderStatus, string> = {
    [OrderStatus.PENDING]: 'Pendiente',
    [OrderStatus.IN_PROGRESS]: 'En Progreso',
    [OrderStatus.COMPLETED]: 'Completado',
    [OrderStatus.CANCELLED]: 'Cancelado',
  };
  return displayNames[status];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface OrderQueryParams extends PaginationParams {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
}

export interface OrderFilterOptions {
  status?: OrderStatus;
  createdAfter?: Date;
  createdBefore?: Date;
}

export interface OrderValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateOrderDescription(description: string): OrderValidationResult {
  const errors: string[] = [];
  
  if (!description || description.trim().length === 0) {
    errors.push('La descripción es requerido');
  }
  
  if (description && description.length < 3) {
    errors.push('La descripción debe tener al menos 3 caracteres');
  }
  
  if (description && description.length > 500) {
    errors.push('La descripción no puede exceder 500 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateOrderStatus(status: string): OrderValidationResult {
  const errors: string[] = [];
  
  if (!status) {
    errors.push('El estado es requerido');
  } else if (!isValidOrderStatus(status)) {
    errors.push(`Estado inválido: ${status}. Estados válidos: ${getOrderStatusValues().join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export interface CreateOrderResponse {
  success: boolean;
  order?: OrderResponseDto;
  error?: string;
}

export interface UpdateOrderResponse {
  success: boolean;
  order?: OrderResponseDto;
  error?: string;
}

export interface DeleteOrderResponse {
  success: boolean;
  message: string;
}

export interface GetOrderResponse {
  success: boolean;
  order?: OrderResponseDto;
  error?: string;
}

export interface ListOrdersResponse {
  success: boolean;
  orders: OrderResponseDto[];
  total: number;
  page?: number;
  limit?: number;
}