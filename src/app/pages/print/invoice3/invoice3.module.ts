import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Invoice3RoutingModule } from './invoice3-routing.module';
import { Invoice3Component } from './invoice3.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgxBarcode6Module} from "ngx-barcode6";
import {PageLoaderComponent} from "../../../shared/components/page-loader/page-loader.component";


@NgModule({
  declarations: [
    Invoice3Component
  ],
  imports: [
    CommonModule,
    Invoice3RoutingModule,
    MatButtonModule,
    MatIconModule,
    NgxBarcode6Module,
    PageLoaderComponent
  ]
})
export class Invoice3Module { }
