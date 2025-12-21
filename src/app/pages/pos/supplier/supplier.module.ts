import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupplierRoutingModule } from './supplier-routing.module';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DigitOnlyModule } from "@uiowa/digit-only";
import { NoContentComponent } from '../../../shared/components/no-content/no-content.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { ConfirmDialogComponent } from '../../../shared/components/ui/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { CurrencyIconPipe } from '../../../shared/pipes/currency-icon.pipe';
import { LimitTextPipe } from '../../../shared/pipes/limit-text.pipe';

// Supplier Components
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';

@NgModule({
  declarations: [
    SupplierListComponent,
    AddSupplierComponent,
    SupplierDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SupplierRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DigitOnlyModule,
    NoContentComponent,
    PageLoaderComponent,
    PaginationComponent,
    ConfirmDialogComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatBadgeModule,
    CurrencyIconPipe,
    LimitTextPipe,
  ]
})
export class SupplierModule { }

