import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent implements OnInit {
  id: number = 0;
  product$!: Observable<Product>;
  product!: Product;

  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

  }

  ngOnInit(): void {
    this.product$ = this.productsService.getProductById(this.id);
    let product: Product;
    this.product$.subscribe((data) => {
      product = data;
      console.log(product)
    });


  }
}
