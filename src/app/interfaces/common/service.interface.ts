export interface Service {
  _id?: string;
  name?: string;
  title?: string;
  type?: string;
  images?: string[];
  seoTitle?: string;
  seoKeyword?: string;
  seoDescription?: string;
  deleteDateString?: string;
  status?: any;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
  services?: Array<{ title?: string; description?: string; image?: string }>;
  authorizedServiceCenters?: Array<{ title?: string; image?: string }>;
  locations?: Array<{ title?: string; address?: string; phone?: string; mapLink?: string; writeOffDay?: number; image?: string }>;
  whyBuyDescription?: string;
}
