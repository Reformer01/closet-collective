
import React from 'react';
import ProductCard from '../products/ProductCard';
import { Product } from '@/types/product';

interface FeaturedProductsProps {
  title: string;
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ title, products }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">{title}</h2>
        <p className="text-fashion-gray text-center mb-10">Handpicked just for you</p>
        
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
