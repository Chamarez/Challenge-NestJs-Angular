import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
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
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsTableComponent } from '../products-table/products-table.component';

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
  isEdit:boolean=false
  @ViewChild('content') templateRef!: TemplateRef<any>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private modal: NgbModal,
    private fb: FormBuilder,
    private productsTableComponent: ProductsTableComponent
  ) {
    if(this.router.url.includes("edit")){
      this.isEdit=true
      this.route.params.subscribe((params) => {
        this.id = params['id'];
      });
    }
  }

  ngAfterViewInit(): void {
    this.open(this.templateRef);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      size: [null, [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
    });
    if(this.router.url.includes("edit")){
      this.product$ = this.productsService.getProductById(this.id);
      let product: Product;
      this.product$.subscribe((data) => {
        product = data;
        this.updateView(product);
      });
    }
  }

  open(content: TemplateRef<any>) {
    this.modal.open(content, { windowClass: 'products-modal ' , animation:true}).result.then(
      (result) => {
        this.router.navigate(['../../'], { relativeTo: this.route });
        this.productsTableComponent.ngOnInit();
      },
      (reason) => {
        this.router.navigate(['../../'], { relativeTo: this.route });
        this.productsTableComponent.ngOnInit();
      }
    );
  }

  private getDismissReason(reason: any): void {
    if (reason === ModalDismissReasons.ESC) {
      this.router.navigate(['../../'], { relativeTo: this.route });
      this.productsTableComponent.ngOnInit();
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.router.navigate(['../../'], { relativeTo: this.route });
      this.productsTableComponent.ngOnInit();
    } else {
      this.router.navigate(['../../'], { relativeTo: this.route });
      this.productsTableComponent.ngOnInit();
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
  onSubmit() {

    if(this.isEdit){
      const product: Product = {
        title: this.form.value.title,
        description: this.form.value.description,
        price: this.form.value.price,
        stock: this.form.value.stock,
        weight: this.form.value.weight,
        size: this.form.value.size,
        _id: this.id,
      };
      this.productsService.updateProduct(this.id, product).subscribe(
        () => {},
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error');
            console.log(err);
          } else if (err.status == 200) {
            alert('Su mensaje fue enviado');
          } else {
            console.log(err.error.message);
          }
        }
        );
      }else{
        const product: Product = {
          title: this.form.value.title,
          description: this.form.value.description,
          price: this.form.value.price,
          stock: this.form.value.stock,
          weight: this.form.value.weight,
          size: this.form.value.size,
        };
        this.productsService.addNewProduct(product).subscribe(()=>{

        }, (err: HttpErrorResponse)=> {

            console.log(err.error.message);
          }

        )}



    this.router.navigate(['../../'], { relativeTo: this.route });
    this.productsTableComponent.ngOnInit();

    this.modal.dismissAll()
  }
}
