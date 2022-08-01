import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { GetProductsResponseDto } from './getProducts.response.dto';

export class FindRandomsDto {
  @IsNotEmpty()
  @IsArray()
  readonly products: GetProductsResponseDto[];
  @IsNotEmpty()
  @IsString()
  index: string;
}
