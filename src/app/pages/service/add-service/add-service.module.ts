import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddServiceRoutingModule } from './add-service-routing.module';
import { AddServiceComponent } from './add-service.component';
import {
    GalleryImagePickerComponent
} from "../../../shared/components/gallery-image-picker/gallery-image-picker.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {HtmlEditorComponent} from "../../../shared/components/html-editor/html-editor.component";


@NgModule({
  declarations: [
    AddServiceComponent
  ],
  imports: [
    CommonModule,
    AddServiceRoutingModule,
    GalleryImagePickerComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    HtmlEditorComponent
  ]
})
export class AddServiceModule { }
