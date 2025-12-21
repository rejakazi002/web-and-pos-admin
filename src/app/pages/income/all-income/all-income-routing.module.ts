import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllIncomeComponent} from "./all-income.component";

const routes: Routes = [
  {path: '', component: AllIncomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllIncomeRoutingModule { }
