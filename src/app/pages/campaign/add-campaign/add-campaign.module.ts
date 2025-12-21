import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCampaignRoutingModule } from './add-campaign-routing.module';
import { AddCampaignComponent } from './add-campaign.component';
import {MaterialModule} from "../../../material/material.module";
import {DigitOnlyModule} from "@uiowa/digit-only";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ImageLoadErrorModule} from "../../../shared/directives/image-load/image-load-error.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {
  GalleryImagePickerComponent
} from "../../../shared/components/gallery-image-picker/gallery-image-picker.component";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {HtmlEditorComponent} from "../../../shared/components/html-editor/html-editor.component";
import {ProductListModule} from "../../../shared/dialog-view/product-list/product-list.module";
import {TitleChangeComponent} from "../title-change/title-change.component";




@NgModule({
  declarations: [
    AddCampaignComponent,
    TitleChangeComponent
  ],
  imports: [
    CommonModule,
    AddCampaignRoutingModule,
    GalleryImagePickerComponent,
    MaterialModule,
    DigitOnlyModule,
    FormsModule,
    ImageLoadErrorModule,
    ReactiveFormsModule,
    FormsModule,

    NgxMaterialTimepickerModule,
    HtmlEditorComponent,
ProductListModule

  ]
})
export class AddCampaignModule { }
