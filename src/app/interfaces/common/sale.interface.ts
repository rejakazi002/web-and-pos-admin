export interface Sale {
  _id?: string;
  invoiceNo?: string;
  products?: any;
  month?: number;
  year?: number;
  customer?: any;
  salesman?: any;
  soldDate?: Date;
  soldDateString?: string;
  subTotal?: number;
  returnTotal?: number;
  total?: number;
  discount?: number;
  discountType?: number;
  discountAmount?: number;
  vatAmount?: number;
  tax?: number; // Tax amount
  ait?: number; // Advance Income Tax
  serviceCharge?: number; // Service charge
  totalPurchasePrice?: number;
  pointsDiscount?: number;
  receivedFromCustomer?: number;
  paymentType?: string;
  usePoints?: number;
  paidAmount?: number;
  status?: string; // 'Sale', 'Return', 'Hold', 'Draft', 'Exchange', 'Repair Sale'
  referenceNo?: string; // Reference number or note
  deliveryDate?: string;
  soldTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  calculation?: SaleCalculation;
  // Item-wise discounts
  itemDiscounts?: ItemDiscount[];
  // Hold Bill
  holdId?: string;
  holdTime?: Date;
  // Draft
  isDraft?: boolean;
  // Exchange
  exchangeFrom?: string; // Original sale ID
  exchangeTo?: string; // New sale ID
  // Multiple payments
  payments?: PaymentBreakdown[];
  dueAmount?: number;
  // Return tracking
  hasPartialReturn?: boolean;
  hasReturn?: boolean;
  totalReturnedAmount?: number;
}

export interface SaleCalculation {
  grandTotal: number;
}


export interface SaleGroup {
  _id: string;
  data: Sale[];
  select?: boolean;
}

// Item-wise discount
export interface ItemDiscount {
  productId: string;
  discount: number;
  discountType: number; // 0 = percentage, 1 = flat
  discountAmount: number;
}

// Payment breakdown for split payments
export interface PaymentBreakdown {
  method: string; // 'cash', 'card', 'bkash', 'nagad', 'rocket', 'due'
  amount: number;
  transactionId?: string; // For mobile banking/card
  reference?: string; // Additional reference
}

// Hold Bill
export interface HoldBill {
  _id?: string;
  holdId: string;
  holdTime: Date;
  sale: Sale;
  shopId?: string;
}

// Draft Bill
export interface DraftBill {
  _id?: string;
  draftId: string;
  sale: Sale;
  shopId?: string;
  createdAt: Date;
}

// Exchange Data
export interface ExchangeData {
  originalSaleId: string;
  returnedProducts: any[];
  newProducts: any[];
  exchangeDifference: number; // Positive = customer pays, Negative = refund
}

