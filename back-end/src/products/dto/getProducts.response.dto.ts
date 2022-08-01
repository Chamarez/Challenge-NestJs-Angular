import {
  IsString,
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  isString,
  IsOptional,
} from 'class-validator';

export class GetProductsResponseDto {
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
  @IsOptional()
  @IsString()
  readonly index?: string;
}
