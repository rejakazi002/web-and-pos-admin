export interface PrescriptionOrder {
  _id?: string;
  name?: string;
  description?: string;
  phoneNo?: string;
  title?: string;
  images?: string[];
  url?: string;
  urlType?: string;
  showHome?: boolean;
  type?: string;
  priority?: string;
  deleteDateString?: string;
  status?: any;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
