import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsTableComponent } from '../products-table/products-table.component';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, AfterViewInit {
  id: string = '';
  closeResult = '';

  @ViewChild('content') templateRef!: TemplateRef<any>;

  constructor(
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private modal: NgbModal,
    private productsTableComponent: ProductsTableComponent
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.open(this.templateRef);
  }


  open(content: TemplateRef<any>) {
    this.modal.open(content, { windowClass: 'products-modal' }).result.then(
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


  confirmation(){
    this.productsService.deleteProduct(this.id).subscribe(()=>{
    }, (err: HttpErrorResponse)=> {
      if (err.error instanceof Error) {
        console.log("Client-side error");
        console.log(err);
      } })

    this.router.navigate(['../../'], { relativeTo: this.route });
    this.productsTableComponent.ngOnInit();
    this.modal.dismissAll();
  }
}
