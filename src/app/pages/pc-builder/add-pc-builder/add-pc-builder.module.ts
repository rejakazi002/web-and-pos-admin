import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPcBuilderRoutingModule } from './add-pc-builder-routing.module';
import { AddPcBuilderComponent } from './add-pc-builder.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  GalleryImagePickerComponent
} from "../../../shared/components/gallery-image-picker/gallery-image-picker.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    AddPcBuilderComponent
  ],
  imports: [
    CommonModule,
    AddPcBuilderRoutingModule,
    FormsModule,
    GalleryImagePickerComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    DigitOnlyModule,
    MatCheckboxModule
  ]
})
export class AddPcBuilderModule { }
