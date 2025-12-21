export interface Shop {
  _id?: string;
  name?: string;
  slug?: string;
  websiteName?: string;
  domain?: string;
  subDomain?: string;
  domainType?: 'sub-domain' | 'domain' | 'domain-http-www' | 'domain-www-http';
  category?: string;
  subCategory?: string;
  customerNotes?: any;
  theme?: string;
  dateString?: string;
  owner?: any;
  users?: any;
  createdAt?: string;
  updatedAt?: string;
  select?: boolean;
  phoneNo?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  status?: string;
  description?: string;
}
