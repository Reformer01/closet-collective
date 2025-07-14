import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/products/ProductCard';
import { getProductsByCategory, products as allProductsData } from '@/data/products'; // Import allProductsData
import { Product } from '@/types/product';
import { Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [showFilters, setShowFilters] = useState(false);
  
  // New state for filters
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '36', '7', '8', '9', '10', '11', '12', '35MM', '40MM', '42MM'];
  const availableColors = [
    { hex: '#bf988a', name: 'Rosy Brown' },
    { hex: '#247c6d', name: 'Pine Green' },
    { hex: '#031c26', name: 'Midnight Green' },
    { hex: '#FFFFFF', name: 'White' },
    { hex: '#000000', name: 'Black' },
    { hex: '#C0C0C0', name: 'Silver' },
    { hex: '#0000FF', name: 'Blue' },
    { hex: '#A52A2A', name: 'Brown' },
    { hex: '#F5F5DC', name: 'Beige' },
    { hex: '#808080', name: 'Gray' },
    { hex: '#8B4513', name: 'Saddle Brown' },
    { hex: '#87CEEB', name: 'Sky Blue' },
    { hex: '#FFC0CB', name: 'Pink' },
    { hex: '#FF5500', name: 'Orange' },
    { hex: '#FF0000', name: 'Red' },
    { hex: '#87CEFA', name: 'Light Sky Blue' },
    { hex: '#FFD700', name: 'Gold' }
  ];

  useEffect(() => {
    setLoading(true);
    let fetchedProducts = category 
      ? getProductsByCategory(category) 
      : allProductsData; // Fallback for broader search if needed

    // Apply filters
    let filtered = fetchedProducts.filter(product => {
      // Filter by size
      if (selectedSizes.length > 0) {
        if (!product.sizes || !product.sizes.some(size => selectedSizes.includes(size))) {
          return false;
        }
      }

      // Filter by color
      if (selectedColors.length > 0) {
        if (!product.colors || !product.colors.some(color => selectedColors.includes(color))) {
          return false;
        }
      }

      // Filter by price
      const productPrice = product.price;
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      if (!isNaN(min) && productPrice < min) {
        return false;
      }
      if (!isNaN(max) && productPrice > max) {
        return false;
      }

      return true;
    });
    
    setProducts(filtered);
    setLoading(false);
  }, [category, selectedSizes, selectedColors, minPrice, maxPrice]);

  // Sort products based on the selected option
  const sortedAndFilteredProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    return 0; // default order
  });

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleColorChange = (colorHex: string) => {
    setSelectedColors(prev => 
      prev.includes(colorHex) ? prev.filter(c => c !== colorHex) : [...prev, colorHex]
    );
  };

  const handleClearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinPrice('');
    setMaxPrice('');
    setSortBy('default');
    setShowFilters(false);
  };

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
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeChange(size)}
                    className={`px-3 py-1 border border-gray-300 text-sm ${
                      selectedSizes.includes(size) ? 'bg-gray-900 text-white' : 'hover:border-fashion-black'
                    }`}
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
                {availableColors.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => handleColorChange(color.hex)}
                    className={`w-6 h-6 rounded-full border border-gray-300 ${
                      selectedColors.includes(color.hex) ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Filter by ${color.name} color`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
            
            {/* Price Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Price Range</h4>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-24"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-24"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm" className="mr-2" onClick={handleClearAllFilters}>
              Clear All
            </Button>
            {/* <Button size="sm" className="bg-fashion-black hover:bg-opacity-90">Apply Filters</Button> */}
            {/* Apply Filters is implicitly handled by useEffect dependencies */}
          </div>
        </div>
      )}
      
      {/* Products Grid */}
      {sortedAndFilteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-2">No products found</h2>
          <p className="text-fashion-gray">Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAndFilteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
