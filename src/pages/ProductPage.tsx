
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '@/components/products/ProductDetail';
import { getProductById } from '@/data/products';
import { Product } from '@/types/product';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // In a real app, this would be an API call
    const fetchProduct = () => {
      if (!id) return;
      
      // Simulate network request
      setTimeout(() => {
        const fetchedProduct = getProductById(parseInt(id));
        setProduct(fetchedProduct || null);
        setLoading(false);
      }, 500);
    };

    fetchProduct();
  }, [id]);

  return <ProductDetail product={product} loading={loading} />;
};

export default ProductPage;
