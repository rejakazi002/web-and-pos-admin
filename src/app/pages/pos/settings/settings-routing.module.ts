import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrinterSettingsComponent } from './printer-settings/printer-settings.component';
import { TaxVatSettingsComponent } from './tax-vat-settings/tax-vat-settings.component';
import { PointSettingsComponent } from './point-settings/point-settings.component';

const routes: Routes = [
  {
    path: 'printer-settings',
    component: PrinterSettingsComponent
  },
  {
    path: 'tax-vat-settings',
    component: TaxVatSettingsComponent
  },
  {
    path: 'point-settings',
    component: PointSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

