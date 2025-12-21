import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosDashboardComponent } from './pos-dashboard.component';

const routes: Routes = [
  { path: '', component: PosDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosDashboardRoutingModule { }

