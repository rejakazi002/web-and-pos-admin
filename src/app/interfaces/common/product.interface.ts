import { Category } from './category.interface';
import { ChildCategory } from './child-category.interface';
import { SubCategory } from './sub-category.interface';
import { Tag } from './tag.interface';
import { Variation, VariationOption } from './variation.interface';

export interface Product {
  _id?: string;
  uniqueId?: string; // Unique identifier for product instances in cart
  name: string;
  slug?: string;
  phoneModel?: string;
  description?: string;
  costPrice?: number;
  totalSold?: number;
  addMore?: boolean;
  salePrice: number;
  hasTax?: boolean;
  tax?: number;
  keyWord?: string;
  productKeyword: string[];
  emiMonth?: number[];
  discountType?: any;
  discountAmount?: number;
  regularPrice?: number;
  images?: string[];
  testimonialImages?: string[];
  trackQuantity?: boolean;
  quantity?: number;
  purchasePrice?: number;
  soldQuantity?: number;
  saleType?: 'Sale' | 'Return';
  returnQuantity?: number;
  maxReturnQuantity?: number;
  returnedQty?: number;
  netQty?: number;
  returnStatus?: 'SOLD' | 'PARTIAL_RETURN' | 'FULL_RETURN';
  // Item-wise discount
  itemDiscount?: number;
  itemDiscountType?: number; // 0 = percentage, 1 = flat
  itemDiscountAmount?: number;
  // Barcode/SKU
  barcode?: string;
  productId?: string; // For barcode scanning
  category?: Category;
  subCategory?: SubCategory;
  childCategory?: ChildCategory;
  brand?: CatalogInfo;
  skinType?: CatalogInfo;
  skinConcern?: CatalogInfo;
  tags?: string[] | Tag[];
  specifications?: ProductSpecification[];
  driveLinks?: ProductSpecification[];
  hasVariations?: boolean;
  variationData?: any;
  variations?: Variation[];
  variationsOptions?: VariationOption[];
  status?: string;
  videoUrl?: string;
  unit?: string;
  weight?: any;
  // Seo
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Point
  earnPoint?: boolean;
  pointType?: number;
  pointValue?: number;
  redeemPoint?: boolean;
  redeemType?: number;
  redeemValue?: number;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  isVariation?: boolean;
  selectedQty?: number;
  // For Create Order
  orderVariationOption?: VariationOption;
  orderVariation?: string;
  variationOptions?: any;
  variation2Options?: any;
  variationList?: VariationList[];

  // For Offer
  offerDiscountAmount?: number;
  offerDiscountType?: number;
  resetDiscount?: boolean;

  vendor?: any;
  deliveryCharge?: any;
  sku?: any;
  parentSku?: any;
  faqList?: any;
  faqTitle?: any;
  isShowInHome?: any;
  title?: any;
  titleImg?: any;
  // Low Stock Alert
  lowStockThreshold?: number;
  // Expiry Date
  expiryDate?: Date;
  expiryDateString?: string;
  // Batch Management
  batchNumber?: string;
  batchDate?: Date;
}

interface CatalogInfo {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductSpecification {
  name?: string;
  value?: string;
}

export interface VariationList {
  _id?: string;
  name?: string;
  barcode?: string;
  sku?: string;
  image?: string;
  salePrice?: number;
  regularPrice?: number;
  discountType?: number;
  costPrice?: number;
  discountAmount?: number;
  quantity?: number;
  trackQuantity?: number;
  lowStockThreshold?: number;
  expiryDate?: Date;
  expiryDateString?: string;
}

export interface PriceData {
  _id: string;
  costPrice: number;
  salePrice: number;
  regularPrice: number;
  discountType?: number;
  discountAmount?: number;
  quantity: number;
  soldQuantity?: number;
  unit: string;
  name: string;
}
