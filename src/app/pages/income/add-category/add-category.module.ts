import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategoryRoutingModule } from './add-category-routing.module';
import { AddCategoryComponent } from './add-category.component';
import {
  GalleryImagePickerComponent
} from "../../../shared/components/gallery-image-picker/gallery-image-picker.component";
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    AddCategoryRoutingModule,
    GalleryImagePickerComponent,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class AddCategoryModule { }
