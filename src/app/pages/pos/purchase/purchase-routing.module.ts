import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { PurchaseReturnListComponent } from './purchase-return-list/purchase-return-list.component';
import { NewPurchaseReturnComponent } from './new-purchase-return/new-purchase-return.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'purchase-list',
    pathMatch: 'full'
  },
  {
    path: 'purchase-list',
    component: PurchaseListComponent
  },
  {
    path: 'add-purchase',
    component: AddPurchaseComponent
  },
  {
    path: 'add-purchase/:id',
    component: AddPurchaseComponent
  },
  {
    path: 'purchase-return-list',
    component: PurchaseReturnListComponent
  },
  {
    path: 'new-purchase-return',
    component: NewPurchaseReturnComponent
  },
  {
    path: 'new-purchase-return/:id',
    component: NewPurchaseReturnComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }

