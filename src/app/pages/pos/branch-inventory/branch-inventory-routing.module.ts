import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchInventoryListComponent } from './branch-inventory-list/branch-inventory-list.component';
import { AddBranchInventoryComponent } from './add-branch-inventory/add-branch-inventory.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BranchInventoryListComponent },
  { path: 'add', component: AddBranchInventoryComponent },
  { path: 'edit/:id', component: AddBranchInventoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchInventoryRoutingModule { }

