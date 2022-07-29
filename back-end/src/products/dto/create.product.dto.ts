import { IsString, IsInt, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;
  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
  @IsNotEmpty()
  @IsNumber()
  readonly size: number;
}
