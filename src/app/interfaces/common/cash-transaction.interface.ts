export interface CashTransactionCategory {
  _id?: string;
  name?: string;
}

export interface CashTransactionBankAccount {
  _id?: string;
  accountName?: string;
  accountNumber?: string;
}

export interface CashTransaction {
  _id?: string;
  shop?: string;
  transactionNo: string;
  transactionDate: Date | string;
  transactionDateString?: string;
  type: 'cash_in' | 'cash_out';
  category?: CashTransactionCategory;
  amount: number;
  description?: string;
  reference?: string;
  paymentMethod?: 'cash' | 'bank' | 'cheque' | 'mobile_banking';
  bankAccount?: CashTransactionBankAccount;
  images?: string[];
  month?: number;
  year?: number;
  createdAtString?: string;
  updatedAtString?: string;
  createdAt?: string;
  updatedAt?: string;
}


