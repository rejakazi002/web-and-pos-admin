import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDamageListComponent } from './product-damage-list/product-damage-list.component';
import { AddProductDamageComponent } from './add-product-damage/add-product-damage.component';

const routes: Routes = [
  { path: 'list', component: ProductDamageListComponent },
  { path: 'add', component: AddProductDamageComponent },
  { path: 'edit/:id', component: AddProductDamageComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDamageRoutingModule { }

