import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path: '', redirectTo: 'bank-account-list', pathMatch: 'full'},
  {path: 'bank-account-list', component: BankAccountListComponent},
  {path: 'add-bank-account', component: AddBankAccountComponent},
  {path: 'add-bank-account/:id', component: AddBankAccountComponent},
  {path: 'cash-transaction-list', component: CashTransactionListComponent},
  {path: 'add-cash-transaction', component: AddCashTransactionComponent},
  {path: 'add-cash-transaction/:id', component: AddCashTransactionComponent},
  {path: 'accounts-ledger', component: AccountsLedgerComponent},
  {path: 'day-close', component: DayCloseComponent},
  {path: 'reports/balance-sheet', component: BalanceSheetComponent},
  {path: 'reports/profit-loss', component: ProfitLossComponent},
  {path: 'reports/tax-report', component: TaxReportComponent},
  {path: 'reports/daily-sale', component: DailySaleReportComponent},
  {path: 'reports/user-wise-sale', component: UserWiseSaleReportComponent},
  {path: 'reports/product-profit', component: ProductProfitReportComponent},
  {path: 'reports/top-selling-products', component: TopSellingProductsComponent},
  {path: 'reports/slow-selling-products', component: SlowSellingProductsComponent},
  {path: 'reports/purchase-vs-sale', component: PurchaseVsSaleComponent},
  {path: 'reports/customer-due', component: CustomerDueReportComponent},
  {path: 'reports/expense', component: ExpenseReportComponent},
  {path: 'reports/inventory-valuation', component: InventoryValuationComponent},
  {path: 'reports/stock-value', component: StockValueReportComponent},
  {path: 'reports/branch-wise-sale', component: BranchWiseSaleReportComponent},
  {path: 'reports/purchase-payment', component: PurchasePaymentReportComponent},
  {path: 'reports/sell-payment', component: SellPaymentReportComponent},
  {path: 'reports/product-sell', component: ProductSellReportComponent},
  {path: 'reports/product-purchase', component: ProductPurchaseReportComponent},
  {path: 'reports/activity-log', component: ActivityLogComponent},
  {path: 'reports/sales-record', component: SalesRecordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }


