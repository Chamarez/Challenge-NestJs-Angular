import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './core/products/products.component';

const routes: Routes = [
  {path:'home', component: ProductsComponent},
  {path: "", redirectTo:"home", pathMatch: 'full'},
  {path: '**', redirectTo:"home", pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
