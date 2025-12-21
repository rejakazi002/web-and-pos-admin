import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';

import {ProductDiscountDialogComponent} from './product-discount-dialog/product-discount-dialog.component';
import {DigitOnlyModule} from '@uiowa/digit-only';
import {PricePipe} from "../../pipes/price.pipe";
import {ImageLoadErrorModule} from "../../directives/image-load/image-load-error.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDiscountDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    DigitOnlyModule,
    PricePipe,
    ImageLoadErrorModule,
    ReactiveFormsModule,

    // Material
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,



  ],
  exports: [ProductListComponent,ProductDiscountDialogComponent]
})
export class ProductListModule { }
