import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import {  Observable } from 'rxjs';
import { map } from "rxjs/operators";


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
  deleteProduct(msjId: number) {
    return this.http.patch(`${environment.API_URL}/products/${msjId}`, '');
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${environment.API_URL}/product/id`, product);
  }

  getProductById(id: number) {
    return this.http.get(`${environment.API_URL}/products/${id}`).pipe(map(response => <Product>response));
  }

}
