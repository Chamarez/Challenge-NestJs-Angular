import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductsTableComponent } from './products-table/products-table.component';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProductsComponent
  ]

})
export class CoreModule { }
