import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalContainerComponent } from './core/modal-container/modal-container.component';
import { ProductsComponent } from './core/products/products.component';

const routes: Routes = [
  {path:'home', component: ProductsComponent},
  {path: 'panel/:id', component:ModalContainerComponent},
  {path: "", redirectTo:"home", pathMatch: 'full'},
  {path: '**', redirectTo:"home", pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
