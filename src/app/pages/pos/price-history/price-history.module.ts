import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PriceHistoryRoutingModule } from './price-history-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { NoContentComponent } from '../../../shared/components/no-content/no-content.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { PriceHistoryComponent } from './price-history.component';

@NgModule({
  declarations: [
    PriceHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PriceHistoryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatOptionModule,
    NoContentComponent,
    PageLoaderComponent
  ]
})
export class PriceHistoryModule { }

