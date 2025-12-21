export interface DayCloseVendor {
  _id?: string;
  name?: string;
}

export interface DayClose {
  _id?: string;
  shop?: string;
  date: Date | string;
  dateString?: string;
  // Sales Summary
  totalSales?: number;
  totalSalesAmount?: number;
  totalSalesReturn?: number;
  totalSalesReturnAmount?: number;
  // Purchase Summary
  totalPurchase?: number;
  totalPurchaseAmount?: number;
  // Cash Transactions
  totalCashIn?: number;
  totalCashOut?: number;
  // Income & Expense
  totalIncome?: number;
  totalExpense?: number;
  // Payments
  totalCustomerPayment?: number;
  totalSupplierPayment?: number;
  // Opening & Closing Balance
  openingBalance?: number;
  closingBalance?: number;
  // Bank Account Summary
  bankDeposits?: number;
  bankWithdrawals?: number;
  // Status
  status?: 'open' | 'closed';
  closedBy?: DayCloseVendor;
  closedAt?: Date | string;
  notes?: string;
  month?: number;
  year?: number;
  createdAtString?: string;
  updatedAtString?: string;
  createdAt?: string;
  updatedAt?: string;
}


