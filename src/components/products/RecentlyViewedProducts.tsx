import React, { useEffect, useState } from 'react';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

const RecentlyViewedProducts = () => {
  const { getRecentlyViewedProducts } = useRecentlyViewed();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getRecentlyViewedProducts());
  }, [getRecentlyViewedProducts]);

  if (products.length === 0) {
    return null; // Don't render if no recently viewed products
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Your Recently Viewed</h2>
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewedProducts;
