import { IsString, IsOptional, IsEnum, MaxLength, MinLength } from 'class-validator';
import { OrderStatus } from '../../../domain/entities/Order';

export class UpdateOrderDto {
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description?: string;

  @IsOptional()
  @IsEnum(OrderStatus, { message: 'El estado debe ser uno de: PENDING, PROCESSING, COMPLETED, CANCELLED' })
  status?: OrderStatus;

  constructor(data: Partial<UpdateOrderDto>) {
    if (data) {
      this.description = data.description;
      this.status = data.status;
    }
  }

  tieneCambios(): boolean {
    return !!this.description || !!this.status;
  }

  validar(): void {
    if (this.description !== undefined) {
      if (this.description.trim().length === 0) {
        throw new Error('La descripción no puede estar en blanco');
      }
      if (this.description.length < 3) {
        throw new Error('La descripción debe tener al menos 3 caracteres');
      }
      if (this.description.length > 500) {
        throw new Error('La descripción no puede exceder 500 caracteres');
      }
    }
    if (this.status !== undefined) {
      const estadosValidos = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
      if (!estadosValidos.includes(this.status)) {
        throw new Error('Estado inválido: debe ser PENDING, PROCESSING, COMPLETED o CANCELLED');
      }
    }
  }

  toOrderUpdate(): { description?: string; status?: OrderStatus } {
    this.validar();
    const updateData: { description?: string; status?: OrderStatus } = {};
    if (this.description !== undefined) {
      updateData.description = this.description.trim();
    }
    if (this.status !== undefined) {
      updateData.status = this.status;
    }
    return updateData;
  }
}