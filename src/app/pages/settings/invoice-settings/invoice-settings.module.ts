import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceSettingsRoutingModule } from './invoice-settings-routing.module';
import { InvoiceSettingsComponent } from './invoice-settings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    InvoiceSettingsComponent
  ],
    imports: [
        CommonModule,
        InvoiceSettingsRoutingModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatFormFieldModule,

    ]
})
export class InvoiceSettingsModule { }
