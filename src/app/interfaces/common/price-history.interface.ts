export interface PriceHistory {
  _id?: string;
  shop?: any;
  product?: {
    _id?: string;
    name?: string;
    sku?: string;
  };
  previousPrice?: {
    costPrice?: number;
    salePrice?: number;
    regularPrice?: number;
  };
  newPrice?: {
    costPrice?: number;
    salePrice?: number;
    regularPrice?: number;
  };
  priceChangeType: 'costPrice' | 'salePrice' | 'regularPrice' | 'all';
  date?: Date;
  dateString?: string;
  month?: number;
  year?: number;
  changedBy?: {
    _id?: string;
    name?: string;
  };
  reason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

