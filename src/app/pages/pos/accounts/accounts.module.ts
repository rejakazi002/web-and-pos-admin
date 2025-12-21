import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountsRoutingModule } from './accounts-routing.module';
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
import { MatTableModule } from '@angular/material/table';
import { CurrencyIconPipe } from '../../../shared/pipes/currency-icon.pipe';
import { LimitTextPipe } from '../../../shared/pipes/limit-text.pipe';

// Accounts Components
import { BankAccountListComponent } from './bank-account-list/bank-account-list.component';
import { AddBankAccountComponent } from './add-bank-account/add-bank-account.component';
import { CashTransactionListComponent } from './cash-transaction-list/cash-transaction-list.component';
import { AddCashTransactionComponent } from './add-cash-transaction/add-cash-transaction.component';
import { AccountsLedgerComponent } from './accounts-ledger/accounts-ledger.component';
import { DayCloseComponent } from './day-close/day-close.component';
import { BalanceSheetComponent } from './reports/balance-sheet/balance-sheet.component';
import { ProfitLossComponent } from './reports/profit-loss/profit-loss.component';
import { TaxReportComponent } from './reports/tax-report/tax-report.component';
import { DailySaleReportComponent } from './reports/daily-sale-report/daily-sale-report.component';
import { UserWiseSaleReportComponent } from './reports/user-wise-sale-report/user-wise-sale-report.component';
import { ProductProfitReportComponent } from './reports/product-profit-report/product-profit-report.component';
import { TopSellingProductsComponent } from './reports/top-selling-products/top-selling-products.component';
import { SlowSellingProductsComponent } from './reports/slow-selling-products/slow-selling-products.component';
import { PurchaseVsSaleComponent } from './reports/purchase-vs-sale/purchase-vs-sale.component';
import { CustomerDueReportComponent } from './reports/customer-due-report/customer-due-report.component';
import { ExpenseReportComponent } from './reports/expense-report/expense-report.component';
import { InventoryValuationComponent } from './reports/inventory-valuation/inventory-valuation.component';
import { StockValueReportComponent } from './reports/stock-value-report/stock-value-report.component';
import { BranchWiseSaleReportComponent } from './reports/branch-wise-sale-report/branch-wise-sale-report.component';
import { PurchasePaymentReportComponent } from './reports/purchase-payment-report/purchase-payment-report.component';
import { SellPaymentReportComponent } from './reports/sell-payment-report/sell-payment-report.component';
import { ProductSellReportComponent } from './reports/product-sell-report/product-sell-report.component';
import { ProductPurchaseReportComponent } from './reports/product-purchase-report/product-purchase-report.component';
import { ActivityLogComponent } from './reports/activity-log/activity-log.component';
import { SalesRecordComponent } from './reports/sales-record/sales-record.component';

@NgModule({
  declarations: [
    BankAccountListComponent,
    AddBankAccountComponent,
    CashTransactionListComponent,
    AddCashTransactionComponent,
    AccountsLedgerComponent,
    DayCloseComponent,
    BalanceSheetComponent,
    ProfitLossComponent,
    TaxReportComponent,
    DailySaleReportComponent,
    UserWiseSaleReportComponent,
    ProductProfitReportComponent,
    TopSellingProductsComponent,
    SlowSellingProductsComponent,
    PurchaseVsSaleComponent,
    CustomerDueReportComponent,
    ExpenseReportComponent,
    InventoryValuationComponent,
    StockValueReportComponent,
    BranchWiseSaleReportComponent,
    PurchasePaymentReportComponent,
    SellPaymentReportComponent,
    ProductSellReportComponent,
    ProductPurchaseReportComponent,
    ActivityLogComponent,
    SalesRecordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AccountsRoutingModule,
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
    MatTableModule,
    CurrencyIconPipe,
    LimitTextPipe,
  ]
})
export class AccountsModule { }


