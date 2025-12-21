import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchAccessManagementComponent } from './branch-access-management/branch-access-management.component';

const routes: Routes = [
  {path: '', redirectTo: 'management', pathMatch: 'full'},
  {path: 'management', component: BranchAccessManagementComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchAccessRoutingModule { }

