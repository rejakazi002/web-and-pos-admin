import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalesRoutingModule } from './sales-routing.module';
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
import { CurrencyIconPipe } from '../../../shared/pipes/currency-icon.pipe';
import { LimitTextPipe } from '../../../shared/pipes/limit-text.pipe';

// Sales Components
import { SaleListComponent } from './sale-list/sale-list.component';
import { NewSalesComponent } from './new-sales/new-sales.component';
import { NewSalesReturnComponent } from './new-sales-return/new-sales-return.component';
import { ReturnListComponent } from './return-list/return-list.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { SplitPaymentDialogComponent } from './split-payment-dialog/split-payment-dialog.component';
import { ReprintBillComponent } from './reprint-bill/reprint-bill.component';
import { ExchangeDialogComponent } from './exchange-dialog/exchange-dialog.component';
import { ReceiptTemplateComponent } from './receipt-template/receipt-template.component';
import { VariationSelectionDialogComponent } from './variation-selection-dialog/variation-selection-dialog.component';

// Barcode Scanner
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    SaleListComponent,
    NewSalesComponent,
    NewSalesReturnComponent,
    ReturnListComponent,
    BarcodeScannerComponent,
    SplitPaymentDialogComponent,
    ReprintBillComponent,
    ExchangeDialogComponent,
    ReceiptTemplateComponent,
    VariationSelectionDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SalesRoutingModule,
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
    CurrencyIconPipe,
    LimitTextPipe,
    ZXingScannerModule,
  ]
})
export class SalesModule { }

