
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
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}
