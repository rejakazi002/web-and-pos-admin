import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Invoice2RoutingModule } from './invoice2-routing.module';
import { Invoice2Component } from './invoice2.component';
import {CurrencyPipe} from "../../../shared/pipes/currency.pipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {PageLoaderComponent} from "../../../shared/components/page-loader/page-loader.component";
import {NgxBarcode6Module} from "ngx-barcode6";


@NgModule({
  declarations: [
    Invoice2Component
  ],
  imports: [
    CommonModule,
    Invoice2RoutingModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    PageLoaderComponent,
    NgxBarcode6Module,
  ]
})
export class Invoice2Module { }
