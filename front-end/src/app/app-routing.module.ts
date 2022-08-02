import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './core/confirmation/confirmation.component';
import { ModalContainerComponent } from './core/modal-container/modal-container.component';
import { ProductsTableComponent } from './core/products-table/products-table.component';
import { ProductsComponent } from './core/products/products.component';

const routes: Routes = [
  {path:'products', component: ProductsComponent, children:[
    {path: 'list/:list', component:ProductsTableComponent, children:[
      {path: 'edit/:id', component:ModalContainerComponent},
      {path: 'add', component:ModalContainerComponent},
      {path: 'delete/:id', component:ConfirmationComponent},

    ]},

  ]},
  {path: "", redirectTo:"products/list/0", pathMatch: 'full'},
  {path: '**', redirectTo:"products/list/0", pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
