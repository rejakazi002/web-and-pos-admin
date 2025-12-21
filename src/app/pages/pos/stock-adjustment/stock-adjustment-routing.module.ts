import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockAdjustmentListComponent } from './stock-adjustment-list/stock-adjustment-list.component';
import { AddStockAdjustmentComponent } from './add-stock-adjustment/add-stock-adjustment.component';

const routes: Routes = [
  { path: 'list', component: StockAdjustmentListComponent },
  { path: 'add', component: AddStockAdjustmentComponent },
  { path: 'edit/:id', component: AddStockAdjustmentComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockAdjustmentRoutingModule { }

