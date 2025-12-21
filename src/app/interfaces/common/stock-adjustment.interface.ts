export interface StockAdjustment {
  _id?: string;
  shop?: any;
  product?: {
    _id?: string;
    name?: string;
    sku?: string;
  };
  adjustmentType: 'stock_in' | 'stock_out';
  quantity: number;
  previousQuantity?: number;
  newQuantity: number;
  reason?: string;
  reference?: string;
  date?: Date;
  dateString?: string;
  month?: number;
  year?: number;
  adjustedBy?: {
    _id?: string;
    name?: string;
  };
  branch?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

