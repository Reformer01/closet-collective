
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Women",
    description: "A timeless classic, our white T-shirt is made from 100% organic cotton for ultimate comfort and breathability. Perfect for layering or wearing alone, this versatile piece is a wardrobe essential.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#FFFFFF", "#000000", "#C0C0C0"],
    isNew: true
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Men",
    description: "These premium slim fit jeans offer the perfect balance of style and comfort. Made from high-quality denim with a touch of stretch for ease of movement.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["#0000FF", "#000000"],
    discount: 15
  },
  {
    id: 3,
    name: "Oversized Knit Sweater",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Women",
    description: "Stay cozy and stylish with our oversized knit sweater. The relaxed fit and soft yarn create the perfect piece for those chilly days.",
    sizes: ["S", "M", "L"],
    colors: ["#A52A2A", "#F5F5DC", "#808080"]
  },
  {
    id: 4,
    name: "Leather Crossbody Bag",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
    category: "Accessories",
    description: "Crafted from genuine leather, this crossbody bag combines functionality with timeless style. Multiple compartments help keep your essentials organized.",
    colors: ["#8B4513", "#000000"]
  },
  {
    id: 5,
    name: "Cotton Dress Shirt",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Men",
    description: "Our premium cotton dress shirt is perfect for both formal occasions and everyday office wear. The tailored fit and breathable fabric ensure you look and feel your best.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#FFFFFF", "#87CEEB", "#FFC0CB"],
    isNew: true
  },
  {
    id: 6,
    name: "Floral Summer Dress",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Women",
    description: "This beautiful floral dress is perfect for summer days. Made from lightweight fabric with a flattering silhouette.",
    sizes: ["XS", "S", "M", "L"],
    discount: 20
  },
  {
    id: 7,
    name: "Radiant Timepiece R93",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7",
    category: "Accessories",
    description: "A statement of luxury and precision. The R93 features a vibrant design with premium materials and Swiss movement. Water-resistant up to 50m.",
    isNew: true,
    colors: ["#FF5500", "#000000", "#FFFFFF"],
    sizes: ["35MM", "40MM"]
  },
  {
    id: 8,
    name: "Running Sneakers",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Men",
    description: "Engineered for performance and comfort, these sneakers feature responsive cushioning and breathable mesh upper.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["#000000", "#FF0000", "#87CEFA"]
  },
  {
    id: 9,
    name: "Chronograph Elite B22",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
    category: "Accessories",
    description: "The Chronograph Elite B22 combines sophistication with functionality. Features include chronograph, date display, and luminous hands.",
    colors: ["#000000", "#C0C0C0"],
    sizes: ["40MM", "42MM"],
    isNew: true
  },
  {
    id: 10,
    name: "Minimalist Silver Watch",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d",
    category: "Accessories",
    description: "Elegance in simplicity. Our minimalist watch features a clean dial, premium stainless steel, and Japanese quartz movement.",
    colors: ["#C0C0C0", "#FFD700"],
    discount: 10
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getDiscountedProducts = (): Product[] => {
  return products.filter(product => product.discount);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};
