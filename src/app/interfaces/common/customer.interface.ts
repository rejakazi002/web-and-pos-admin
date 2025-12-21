export interface Customer {
  _id?: string;
  name?: string;
  phone: string;
  email?: string;
  address?: string;
  image?: string;
  birthdate?: Date;
  userPoints?: number;
  
  // Customer Group
  customerGroup?: 'VIP' | 'General' | 'Wholesale';
  
  // Due Management
  totalDue?: number;
  totalPaid?: number;
  
  // Wallet Balance
  walletBalance?: number;
  
  // Communication Preferences
  smsEnabled?: boolean;
  emailEnabled?: boolean;
  
  // Additional fields
  alternatePhone?: string;
  city?: string;
  country?: string;
  notes?: string;
  
  // Statistics (computed)
  totalPurchases?: number;
  totalSpent?: number;
  averageOrderValue?: number;
  lastPurchaseDate?: Date;
  
  createdAt?: Date;
  updatedAt?: Date;
  createdAtString?: string;
  updatedAtString?: string;
}

