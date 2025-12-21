import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewReleaseDialogComponent } from './new-release-dialog.component';
import {MaterialModule} from "../../../material/material.module";



@NgModule({
  declarations: [
    NewReleaseDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class NewReleaseDialogModule { }
