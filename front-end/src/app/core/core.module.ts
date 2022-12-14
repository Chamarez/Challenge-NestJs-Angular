import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { SharedModule } from '../shared/shared.module';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { AppRoutingModule } from '../app-routing.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsTableComponent,
    ModalContainerComponent,
    ConfirmationComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,

  ],
  exports:[
    ProductsComponent
  ],

})
export class CoreModule { }
