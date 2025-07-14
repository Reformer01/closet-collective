import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Newsletter from '@/components/home/Newsletter';
import RecentlyViewedProducts from '@/components/products/RecentlyViewedProducts'; // Import RecentlyViewedProducts
import { getFeaturedProducts, getDiscountedProducts } from '@/data/products';

const Index = () => {
  // In a real app, we would fetch this data from an an API
  const featuredProducts = getFeaturedProducts();
  const saleProducts = getDiscountedProducts();
  
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts title="New Arrivals" products={featuredProducts} />
      <FeaturedProducts title="On Sale" products={saleProducts} />
      <RecentlyViewedProducts /> {/* Add RecentlyViewedProducts component */}
      <Newsletter />
    </div>
  );
};

export default Index;
