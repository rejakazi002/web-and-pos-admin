export interface MembershipCard {
  _id?: string;
  shop?: any;
  customer?: any;
  cardNumber?: string;
  cardType?: 'Silver' | 'Gold' | 'Platinum' | 'VIP';
  issueDate?: Date;
  expiryDate?: Date;
  status?: 'active' | 'expired' | 'suspended';
  benefits?: {
    discountPercentage?: number;
    pointsMultiplier?: number;
    freeDelivery?: boolean;
    prioritySupport?: boolean;
  };
  totalSpent?: number;
  totalPoints?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

