import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';
import { getProductById } from '@/data/products'; // To fetch full product details

interface RecentlyViewedContextType {
  recentlyViewedProductIds: number[];
  addRecentlyViewedProduct: (productId: number) => void;
  getRecentlyViewedProducts: () => Product[];
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
  const [recentlyViewedProductIds, setRecentlyViewedProductIds] = useState<number[]>(() => {
    const storedIds = localStorage.getItem('recentlyViewed');
    return storedIds ? JSON.parse(storedIds) : [];
  });

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewedProductIds));
  }, [recentlyViewedProductIds]);

  const addRecentlyViewedProduct = (productId: number) => {
    setRecentlyViewedProductIds((prevIds) => {
      // Remove if already exists to move it to the front
      const filteredIds = prevIds.filter(id => id !== productId);
      // Add to the front, limit to a certain number (e.g., 5)
      return [productId, ...filteredIds].slice(0, 5);
    });
  };

  const getRecentlyViewedProducts = (): Product[] => {
    // Fetch full product details for each ID
    return recentlyViewedProductIds
      .map(id => getProductById(id))
      .filter((product): product is Product => product !== undefined);
  };

  return (
    <RecentlyViewedContext.Provider value={{
      recentlyViewedProductIds,
      addRecentlyViewedProduct,
      getRecentlyViewedProducts
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};
