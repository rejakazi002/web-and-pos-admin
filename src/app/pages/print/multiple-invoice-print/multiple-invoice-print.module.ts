import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleInvoicePrintRoutingModule } from './multiple-invoice-print-routing.module';
import { MultipleInvoicePrintComponent } from './multiple-invoice-print.component';
import {PageLoaderComponent} from "../../../shared/components/page-loader/page-loader.component";
import {CurrencyPipe} from "../../../shared/pipes/currency.pipe";
import {MaterialModule} from "../../../material/material.module";


@NgModule({
  declarations: [
    MultipleInvoicePrintComponent
  ],
  imports: [
    CommonModule,
    MultipleInvoicePrintRoutingModule,
    PageLoaderComponent,
    CurrencyPipe,
    MaterialModule
  ]
})
export class MultipleInvoicePrintModule { }
