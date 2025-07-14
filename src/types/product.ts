export interface Review {
  id: number;
  rating: number; // 1-5 stars
  comment: string;
  author: string;
  date: string; // e.g., "January 1, 2023"
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  isNew?: boolean;
  discount?: number;
  reviews?: Review[]; // Add reviews property
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}
