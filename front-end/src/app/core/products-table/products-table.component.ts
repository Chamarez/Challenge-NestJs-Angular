import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product.model';
import { map } from 'rxjs';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  products:Product[]=[];
  pageSize = 10;
  page = 1;

  collectionSize = 0;


  constructor(private readonly productsService: ProductsService) {


  }

  ngOnInit(): void {
    this.getProducts()
    this.refreshProducts();
  }


  getProducts(){
    this.productsService.getProducts().subscribe((data)=>{
      this.products= data.sort(() => (Math.random() > .5) ? 1 : -1);
      this.collectionSize= this.products.length
      if(this.collectionSize>200){
        this.collectionSize=200;
      }
    });

  }
  refreshProducts() {
    this.products = this.products
      .map((product, i) => ({id: i + 1, ...product}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
