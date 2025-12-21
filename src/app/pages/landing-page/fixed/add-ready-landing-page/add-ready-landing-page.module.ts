import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddReadyLandingPageRoutingModule } from './add-ready-landing-page-routing.module';
import { AddReadyLandingPageComponent } from './add-ready-landing-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  GalleryImagePickerComponent
} from "../../../../shared/components/gallery-image-picker/gallery-image-picker.component";
import {HtmlEditorComponent} from "../../../../shared/components/html-editor/html-editor.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ProductSearchComponent} from "../../../../shared/components/product-search/product-search.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    AddReadyLandingPageComponent
  ],
  imports: [
    CommonModule,
    AddReadyLandingPageRoutingModule,
    FormsModule,
    GalleryImagePickerComponent,
    HtmlEditorComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ProductSearchComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule
  ]
})
export class AddReadyLandingPageModule { }
