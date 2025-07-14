import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products as allProducts } from '@/data/products';
import { Product } from '@/types/product';
import ProductCard from '@/components/products/ProductCard';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate fetching data based on query (in a real app, this would be an API call)
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredProducts);
    setLoading(false);
  }, [query]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-60 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <h1 className="text-3xl font-bold mb-2">Search Results for "{query}"</h1>
      <p className="text-fashion-gray mb-8">{searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} found</p>

      {searchResults.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-2">No products found for "{query}"</h2>
          <p className="text-fashion-gray">Try a different search term or browse our categories.</p>
        </div>
      ) : (
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
