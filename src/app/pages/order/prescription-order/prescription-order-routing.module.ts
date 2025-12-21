import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrescriptionOrderComponent} from "./prescription-order.component";

const routes: Routes = [
  {path:'',component:PrescriptionOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrescriptionOrderRoutingModule { }
