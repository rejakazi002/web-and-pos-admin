import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserNotificationRoutingModule } from './add-user-notification-routing.module';
import { AddUserNotificationComponent } from './add-user-notification.component';
import {DigitOnlyModule} from "@uiowa/digit-only";
import {
  GalleryImagePickerComponent
} from "../../../shared/components/gallery-image-picker/gallery-image-picker.component";
import {HtmlEditorComponent} from "../../../shared/components/html-editor/html-editor.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AddUserNotificationComponent
  ],
  imports: [
    CommonModule,
    AddUserNotificationRoutingModule,
    DigitOnlyModule,
    GalleryImagePickerComponent,
    HtmlEditorComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class AddUserNotificationModule { }
