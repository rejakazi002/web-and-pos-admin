export interface Expense {
  _id?: string;
  readOnly?: boolean;
  shop?: string;
  name?: string;
  slug?: string;
  image?: string;
  category?: {
    _id?: string;
    name?: string;
  };
  date?: Date;
  amount?: number;
  invoices?: string[];
  type?: string;
  images?: string[];
  description?: string;
  url?: string;
  urlType?: string;
  priority?: number;
  serial?: number;
  createdAt?: Date;
  updatedAt?: Date;
  status?: string;
  select?: boolean;
  featureStatus?: boolean;
  featureImage?: string;
  deleteDateString?: string;
}
