import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddIncomeRoutingModule } from './add-income-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {AddIncomeComponent} from "./add-income.component";
import {
    GalleryImagePickerComponent
} from "../../../shared/components/gallery-image-picker/gallery-image-picker.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DigitOnlyModule} from "@uiowa/digit-only";


@NgModule({
  declarations: [
    AddIncomeComponent
  ],
  imports: [
    CommonModule,
    AddIncomeRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    GalleryImagePickerComponent,
    MatDatepickerModule,
    DigitOnlyModule
  ]
})
export class AddIncomeModule { }
