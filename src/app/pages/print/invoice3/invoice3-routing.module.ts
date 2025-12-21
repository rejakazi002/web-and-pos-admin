import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Invoice3Component} from "./invoice3.component";

const routes: Routes = [
  {
    path: '',
    component: Invoice3Component,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Invoice3RoutingModule { }
