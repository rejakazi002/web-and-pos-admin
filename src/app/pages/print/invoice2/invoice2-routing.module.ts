import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Invoice2Component} from "./invoice2.component";

const routes: Routes = [
  {
    path: '',
    component: Invoice2Component,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Invoice2RoutingModule { }
