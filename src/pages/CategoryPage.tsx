
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/products/ProductCard';
import { getProductsByCategory } from '@/data/products';
import { Product } from '@/types/product';
import { Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    // In a real app, this would be an API call with filters
    setTimeout(() => {
      if (category) {
        const fetchedProducts = getProductsByCategory(category);
        setProducts(fetchedProducts);
      }
      setLoading(false);
    }, 500);
  }, [category]);

  // Sort products based on the selected option
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    return 0; // default order
  });

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
      <h1 className="text-3xl font-bold mb-2 capitalize">{category}</h1>
      <p className="text-fashion-gray mb-8">{products.length} products</p>
      
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between mb-8">
        <Button
          variant="outline"
          className="mb-4 sm:mb-0"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        
        <div className="flex items-center">
          <span className="mr-3 text-fashion-gray">Sort by:</span>
          <div className="relative">
            <select
              className="appearance-none border border-gray-300 rounded px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-fashion-black"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ArrowUpDown className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-fashion-gray" />
          </div>
        </div>
      </div>
      
      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 p-4 mb-8 rounded-lg animate-fade-in">
          <h3 className="font-medium mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Size Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Size</h4>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className="px-3 py-1 border border-gray-300 hover:border-fashion-black text-sm"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Color</h4>
              <div className="flex flex-wrap gap-2">
                {['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#FFFF00'].map((color) => (
                  <button
                    key={color}
                    className="w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                    aria-label={`Filter by ${color} color`}
                  />
                ))}
              </div>
            </div>
            
            {/* Price Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Price</h4>
              <div className="space-y-1">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Under $50</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">$50 - $100</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">$100 - $200</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">$200+</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" className="mr-2">
              Clear All
            </Button>
            <Button size="sm" className="bg-fashion-black hover:bg-opacity-90">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
      
      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-fashion-gray">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
