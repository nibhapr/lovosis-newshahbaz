export interface Review {
  _id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  comment: string;
  itemType: 'blog' | 'event' | 'product';
  itemId: string;
  createdAt: string;
} 