import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferRequestListComponent } from './transfer-request-list/transfer-request-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TransferRequestListComponent },
  { path: 'create', component: TransferRequestListComponent }, // TODO: Create component
  { path: 'details/:id', component: TransferRequestListComponent } // TODO: Create component
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRequestRoutingModule { }

