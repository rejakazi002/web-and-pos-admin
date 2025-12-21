import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Invoice5RoutingModule} from './invoice5-routing.module';
import {Invoice4Component} from "../invoice4/invoice4.component";
import {Invoice4RoutingModule} from "../invoice4/invoice4-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgxBarcode6Module} from "ngx-barcode6";
import {PageLoaderComponent} from "../../../shared/components/page-loader/page-loader.component";
import {CurrencyPipe} from "../../../shared/pipes/currency.pipe";
import {Invoice5Component} from "./invoice5.component";


@NgModule({
  declarations: [
    Invoice5Component,
  ],
  imports: [
    CommonModule,
    Invoice5RoutingModule,
    MatButtonModule,
    MatIconModule,
    NgxBarcode6Module,
    PageLoaderComponent,
    CurrencyPipe
  ]
})
export class Invoice5Module {
}
