import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Invoice4Component} from "./invoice4.component";

const routes: Routes = [  {
  path: '',
  component: Invoice4Component,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Invoice4RoutingModule { }
