export interface PurchaseProduct {
  productId: string;
  name?: string;
  sku?: string;
  quantity: number;
  purchasePrice: number;
  salePrice?: number;
  total: number;
}

export interface Purchase {
  _id?: string;
  shop?: any;
  supplier: {
    _id: string;
    name?: string;
    phone?: string;
  };
  purchaseNo: string;
  purchaseDate: Date | string;
  purchaseDateString?: string;
  products: PurchaseProduct[];
  subTotal: number;
  discount: number;
  discountType?: number;
  tax: number;
  shipping: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  paymentType: 'cash' | 'bank' | 'cheque' | 'mobile_banking' | 'due' | 'partial';
  paymentMethod?: string;
  reference?: string;
  status: 'Completed' | 'Pending' | 'Partial' | 'Cancelled';
  notes?: string;
  month?: number;
  year?: number;
  createdAtString?: string;
  updatedAtString?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

