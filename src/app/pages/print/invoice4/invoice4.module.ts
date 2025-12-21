import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Invoice4RoutingModule } from './invoice4-routing.module';
import {Invoice4Component} from "./invoice4.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgxBarcode6Module} from "ngx-barcode6";
import {PageLoaderComponent} from "../../../shared/components/page-loader/page-loader.component";
import {CurrencyPipe} from "../../../shared/pipes/currency.pipe";


@NgModule({
  declarations: [
    Invoice4Component,
  ],
  imports: [
    CommonModule,
    Invoice4RoutingModule,
    MatButtonModule,
    MatIconModule,
    NgxBarcode6Module,
    PageLoaderComponent,
    CurrencyPipe
  ]
})
export class Invoice4Module { }
