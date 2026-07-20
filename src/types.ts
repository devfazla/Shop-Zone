export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images: string[]; // for gallery
  rating: number;
  reviewCount: number;
  description: string;
  sizes?: string[];
  colors?: ColorOption[];
  features?: string[];
  stock: number;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + size + color)
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: ColorOption;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
}
