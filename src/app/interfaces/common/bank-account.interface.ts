export interface BankAccount {
  _id?: string;
  shop?: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName?: string;
  accountType?: 'savings' | 'current' | 'fixed_deposit' | 'other';
  initialBalance?: number;
  currentBalance?: number;
  status?: 'active' | 'inactive' | 'closed';
  notes?: string;
  createdAtString?: string;
  updatedAtString?: string;
  createdAt?: string;
  updatedAt?: string;
}


