import {
  AfterViewInit,
  Component,
  ElementRef,
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
    private fb: FormBuilder,

  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.product$ = this.productsService.getProductById(this.id);
    let product: Product;
    this.product$.subscribe((data) => {
      product = data;
      console.log(product);
    });
  }
  ngAfterViewInit(): void {
    this.open(this.templateRef)
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      mount: [null, [Validators.required, Validators.minLength(1)]],
      concept: ['', [Validators.required, Validators.minLength(3)]],
      operation: ['', [Validators.required]],
    });
  }

  open(content: TemplateRef<any>) {
    this.modal
      .open(content, { windowClass: 'products-modal' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
