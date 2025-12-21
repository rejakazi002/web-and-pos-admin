import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleStickerRoutingModule } from './multiple-sticker-routing.module';
import { MultipleStickerComponent } from './multiple-sticker.component';
import {PageLoaderComponent} from "../../../shared/components/page-loader/page-loader.component";
import {MaterialModule} from "../../../material/material.module";
import {NgxBarcode6Module} from "ngx-barcode6";
import {CurrencyPipe} from "../../../shared/pipes/currency.pipe";


@NgModule({
  declarations: [
    MultipleStickerComponent
  ],
    imports: [
        CommonModule,
        MultipleStickerRoutingModule,
        PageLoaderComponent,
        MaterialModule,
        NgxBarcode6Module,
        CurrencyPipe,
    ]
})
export class MultipleStickerModule { }
