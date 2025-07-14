import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '@/components/products/ProductDetail';
import { getProductById } from '@/data/products';
import { Product } from '@/types/product';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext'; // Import useRecentlyViewed

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addRecentlyViewedProduct } = useRecentlyViewed(); // Use the hook

  useEffect(() => {
    setLoading(true);
    
    const fetchProduct = () => {
      if (!id) return;
      
      const fetchedProduct = getProductById(parseInt(id));
      setProduct(fetchedProduct || null);
      setLoading(false);

      if (fetchedProduct) {
        addRecentlyViewedProduct(fetchedProduct.id); // Add to recently viewed
      }
    };

    fetchProduct();
  }, [id, addRecentlyViewedProduct]);

  return <ProductDetail product={product} loading={loading} />;
};

export default ProductPage;
