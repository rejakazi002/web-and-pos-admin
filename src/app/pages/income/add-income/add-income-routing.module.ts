import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddIncomeComponent} from "./add-income.component";

const routes: Routes = [
  {path: '', component: AddIncomeComponent},
  {path: ':id', component: AddIncomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddIncomeRoutingModule { }
