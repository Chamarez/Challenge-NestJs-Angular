import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalContainerComponent } from './core/modal-container/modal-container.component';
import { ProductsTableComponent } from './core/products-table/products-table.component';
import { ProductsComponent } from './core/products/products.component';

const routes: Routes = [
  {path:'products', component: ProductsComponent, children:[
    {path: 'list/:list', component:ProductsTableComponent, children:[
      {path: 'edit/:id', component:ModalContainerComponent},
    ]},

  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
