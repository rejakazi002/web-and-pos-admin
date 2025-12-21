export interface ProductDamage {
  _id?: string;
  shop?: any;
  product?: {
    _id?: string;
    name?: string;
    sku?: string;
    purchasePrice?: number;
    costPrice?: number;
    salePrice?: number;
    discountType?: number;
    discountAmount?: number;
  };
  quantity?: number;
  dateString?: string;
  month?: number;
  year?: number;
  date?: Date;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

