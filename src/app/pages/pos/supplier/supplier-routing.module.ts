import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'supplier-list', pathMatch: 'full'},
  {path: 'supplier-list', component: SupplierListComponent},
  {path: 'add-supplier', component: AddSupplierComponent},
  {path: 'add-supplier/:id', component: AddSupplierComponent},
  {path: 'supplier-details/:id', component: SupplierDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }

