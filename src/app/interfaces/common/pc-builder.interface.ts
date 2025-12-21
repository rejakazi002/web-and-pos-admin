export interface PcBuilder {
  _id?: string;
  name?: string;
  title?: string;
  url?: string;
  isRequired?: boolean;
  type?: string;
  images?: string[];
  seoTitle?: string;
  deleteDateString?: string;
  status?: any;
  priority?: any;
  createdAt?: Date;
  updatedAt?: Date;
  select?: boolean;
}
