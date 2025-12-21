import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentralDashboardComponent } from './central-dashboard.component';

const routes: Routes = [
  { path: '', component: CentralDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralDashboardRoutingModule { }

