import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentralProductListComponent } from './central-product-list/central-product-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: CentralProductListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralProductRoutingModule { }

