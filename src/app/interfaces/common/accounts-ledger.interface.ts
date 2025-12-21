export interface AccountsLedgerCustomer {
  _id?: string;
  name?: string;
}

export interface AccountsLedgerSupplier {
  _id?: string;
  name?: string;
}

export interface AccountsLedgerBankAccount {
  _id?: string;
  accountName?: string;
}

export interface AccountsLedgerCategory {
  _id?: string;
  name?: string;
}

export interface AccountsLedger {
  _id?: string;
  shop?: string;
  date: Date | string;
  dateString?: string;
  transactionType:
    | 'sale'
    | 'purchase'
    | 'cash_in'
    | 'cash_out'
    | 'income'
    | 'expense'
    | 'supplier_payment'
    | 'customer_payment'
    | 'bank_deposit'
    | 'bank_withdrawal'
    | 'transfer';
  referenceId?: string;
  referenceNo?: string;
  description?: string;
  debit?: number;
  credit?: number;
  balance?: number;
  customer?: AccountsLedgerCustomer;
  supplier?: AccountsLedgerSupplier;
  bankAccount?: AccountsLedgerBankAccount;
  category?: AccountsLedgerCategory;
  month?: number;
  year?: number;
  createdAtString?: string;
  updatedAtString?: string;
  createdAt?: string;
  updatedAt?: string;
}


