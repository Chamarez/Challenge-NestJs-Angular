import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product.model';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit {
  products: Product[] = [];
  pageSize = 10;
  page = 1;
  list: string = '';
  index: string = '';

  collectionSize = 0;

  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.list = params['list'];
    });
  }

  ngOnInit(): void {
    if (this.list === '0') {
      this.getRandomProducts();
    } else {
      this.getProductsByIndex(this.list);
    }
    this.refreshProducts();
  }

  getProductsByIndex(index: string) {
    this.productsService.getProductByIndex(index).subscribe((data) => {
      this.products = data;
      this.collectionSize = this.products.length;
      if (this.collectionSize > 200) {
        this.collectionSize = 200;
      }
      this.products.map((x, i) => {
        x.id = i;
      });
    });
  }

  getRandomProducts() {
    this.productsService.getRandomProducts().subscribe((data) => {
      this.products = data.products;
      this.index = data.index;
      this.collectionSize = this.products.length;
      if (this.collectionSize > 200) {
        this.collectionSize = 200;
      }
      this.products.map((x, i) => {
        x.id = i;
      });
      this.router.navigate([`products/list/${this.index}`]);
    });
  }
  refreshProducts() {
    this.products = this.products
      .map((product, i) => ({ id: i + 1, ...product }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  deleteProduct(id: string) {
    this.productsService.deleteProduct(id);
  }
  updateProduct(id: string, product: Product) {
    this.productsService.updateProduct(id, product);
  }
  openModal(id: string) {
    this.router.navigate([`products/list/${this.list}/edit/${id}`]);
  }
  openConfirmationModal(id: string) {
    this.router.navigate([`products/list/${this.list}/delete/${id}`]);
  }
}
