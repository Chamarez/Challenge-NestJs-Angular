import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  readonly title?: string;
  @IsOptional()
  @IsString()
  readonly description?: string;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly price?: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly stock?: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly weight?: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly size?: number;
}
