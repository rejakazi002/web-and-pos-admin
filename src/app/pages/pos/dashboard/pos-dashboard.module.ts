import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PosDashboardRoutingModule } from './pos-dashboard-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { PosDashboardComponent } from './pos-dashboard.component';
import { CurrencyIconPipe } from '../../../shared/pipes/currency-icon.pipe';

@NgModule({
  declarations: [
    PosDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PosDashboardRoutingModule,
    MaterialModule,
    CurrencyIconPipe
  ]
})
export class PosDashboardModule { }

