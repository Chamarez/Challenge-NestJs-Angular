import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalContainerComponent } from './core/modal-container/modal-container.component';
import { ProductsTableComponent } from './core/products-table/products-table.component';
import { ProductsComponent } from './core/products/products.component';

const routes: Routes = [
  {path:'products', component: ProductsComponent, children:[
    {path: 'list', component:ProductsTableComponent, children:[
      {path: ':id', component:ModalContainerComponent},
    ]},

  ]},
  {path: "", redirectTo:"products", pathMatch: 'full'},
  {path: '**', redirectTo:"products", pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
