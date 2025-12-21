import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleListComponent } from './sale-list/sale-list.component';
import { NewSalesComponent } from './new-sales/new-sales.component';
import { NewSalesReturnComponent } from './new-sales-return/new-sales-return.component';
import { ReturnListComponent } from './return-list/return-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'sale-list', pathMatch: 'full'},
  {path: 'sale-list', component: SaleListComponent},
  {path: 'new-sales', component: NewSalesComponent},
  {path: 'new-sales/:id', component: NewSalesComponent},
  {path: 'new-sales-return', component: NewSalesReturnComponent},
  {path: 'return-list', component: ReturnListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }

