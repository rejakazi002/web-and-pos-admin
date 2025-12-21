import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CentralDashboardRoutingModule } from './central-dashboard-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CentralDashboardComponent } from './central-dashboard.component';

@NgModule({
  declarations: [
    CentralDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CentralDashboardRoutingModule,
    MaterialModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class CentralDashboardModule { }

