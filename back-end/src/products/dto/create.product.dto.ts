import {
  IsString,
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly weight: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly size: number;
}
