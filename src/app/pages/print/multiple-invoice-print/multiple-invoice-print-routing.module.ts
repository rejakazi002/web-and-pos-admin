import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MultipleInvoicePrintComponent} from "./multiple-invoice-print.component";

const routes: Routes = [
  { path: '', component: MultipleInvoicePrintComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultipleInvoicePrintRoutingModule { }
