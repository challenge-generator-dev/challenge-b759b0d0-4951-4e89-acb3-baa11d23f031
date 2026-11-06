import { IsString, IsNotEmpty, IsEnum, MaxLength, MinLength } from 'class-validator';
import { OrderStatus } from '../../../domain/entities/Order';

export class CreateOrderDto {
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @MinLength(3, { message: 'La descripción debe tener al menos 3 caracteres' })
  @MaxLength(500, { message: 'La descripción no puede exceder 500 caracteres' })
  description!: string;

  @IsEnum(OrderStatus, { message: 'El estado debe ser uno de: PENDING, PROCESSING, COMPLETED, CANCELLED' })
  @IsNotEmpty({ message: 'El estado no puede estar vacío' })
  status!: OrderStatus;

  constructor(data: Partial<CreateOrderDto>) {
    if (data) {
      this.description = data.description;
      this.status = data.status;
    }
  }

  validar(): void {
    if (!this.description || this.description.trim().length === 0) {
      throw new Error('La descripción no puede estar en blanco');
    }
    if (this.description.length < 3) {
      throw new Error('La descripción debe tener al menos 3 caracteres');
    }
    if (this.description.length > 500) {
      throw new Error('La descripción no puede exceder 500 caracteres');
    }
    const estadosValidos = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
    if (!estadosValidos.includes(this.status)) {
      throw new Error('Estado inválido: debe ser PENDING, PROCESSING, COMPLETED o CANCELLED');
    }
  }

  toOrder(): { description: string; status: OrderStatus } {
    this.validar();
    return {
      description: this.description.trim(),
      status: this.status,
    };
  }
}