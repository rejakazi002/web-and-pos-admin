import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { PrinterSettingsComponent } from './printer-settings/printer-settings.component';
import { TaxVatSettingsComponent } from './tax-vat-settings/tax-vat-settings.component';
import { PointSettingsComponent } from './point-settings/point-settings.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    PrinterSettingsComponent,
    TaxVatSettingsComponent,
    PointSettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SettingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PageLoaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class SettingsModule { }

