import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import {  Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { RandomProduct } from '../models/random-products.model';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_URL}/products`);
  }

  addNewProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.API_URL}/products`, product);
  }
  deleteProduct(msjId: string) {
    return this.http.patch(`${environment.API_URL}/products/${msjId}`, '');
  }

  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put(`${environment.API_URL}/product/id`, product);
  }

  getProductById(id: string) {
    return this.http.get(`${environment.API_URL}/products/${id}`).pipe(map(response => <Product>response));
  }

  getRandomProducts(): Observable<RandomProduct> {
    return this.http.get<RandomProduct>(`${environment.API_URL}/products/random`);
  }
  getProductByIndex(id: string): Observable<Product[]> {
    return this.http.get(`${environment.API_URL}/products/index/${id}`).pipe(map(response => <Product[]>response));
  }

}
