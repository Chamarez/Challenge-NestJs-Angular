import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent implements OnInit, AfterViewInit {
  id: string = '';
  product$!: Observable<Product>;
  product!: Product;
  closeResult = '';
  form!: FormGroup;


  @ViewChild('content') templateRef!: TemplateRef<any>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private modal: NgbModal,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  ngAfterViewInit(): void {
    this.open(this.templateRef);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      size: [null, [Validators.required, Validators.minLength(1)]],
      weight: ['', [Validators.required, Validators.minLength(3)]],
      stock: ['', [Validators.required]],
    });
    this.product$ = this.productsService.getProductById(this.id);
    let product: Product;
    this.product$.subscribe((data) => {
      product = data;
      this.updateView(product);
    });
    console.log(this.router.url.split('/')[3])
  }

  open(content: TemplateRef<any>) {
    this.modal.open(content, { windowClass: 'products-modal' }).result.then(
      (result) => {

        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      (reason) => {
        this.router.navigate(['../../'], { relativeTo: this.route });
      }
    );
  }

  private getDismissReason(reason: any): void {
    if (reason === ModalDismissReasons.ESC) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
        this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

  updateView(product: Product) {
    this.form.patchValue({
      title: product.title,
      description: product.description,
      price: product.price,
      size: product.size,
      weight: product.weight,
      stock: product.stock,
    });
  }
}
