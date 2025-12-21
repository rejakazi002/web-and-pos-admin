import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchListComponent } from './branch-list/branch-list.component';
import { AddBranchComponent } from './add-branch/add-branch.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BranchListComponent },
  { path: 'add', component: AddBranchComponent },
  { path: 'edit/:id', component: AddBranchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchManagementRoutingModule { }

