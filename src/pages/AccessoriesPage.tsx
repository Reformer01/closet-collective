
import React, { useState, useEffect } from 'react';
import { getProductsByCategory } from '@/data/products';
import { Product } from '@/types/product';
import { ArrowRight, Circle, CircleDot, PlusCircle, MinusCircle } from 'lucide-react';
import ParallaxEffect from '@/components/home/ParallaxEffect';
import { useNavigate } from 'react-router-dom';

const AccessoriesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVariant, setActiveVariant] = useState('40MM');
  const [activeColor, setActiveColor] = useState('#FF5500');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    
    // Simulate a network request
    setTimeout(() => {
      const fetchedProducts = getProductsByCategory('Accessories');
      setProducts(fetchedProducts);
      
      // Set first product as active by default
      if (fetchedProducts.length > 0) {
        setActiveProduct(fetchedProducts[0]);
      }
      
      setLoading(false);
    }, 500);
  }, []);

  const colorOptions = [
    { id: 'color1', color: '#FF5500', name: 'Orange' },
    { id: 'color2', color: '#000000', name: 'Black' },
    { id: 'color3', color: '#FFFFFF', name: 'White' }
  ];

  const sizeOptions = [
    { id: 'size1', size: '35MM' },
    { id: 'size2', size: '40MM' }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-96 w-96 bg-gray-200 rounded-full mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mt-8"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 overflow-hidden">
      {/* Header navigation */}
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="font-bold text-xl uppercase tracking-wider">Luxury Timepieces</h1>
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: activeColor }}></div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm">
            {sizeOptions.map((option) => (
              <button
                key={option.id}
                className={`px-2 py-1 ${activeVariant === option.size ? 'text-black font-medium' : 'text-gray-400'}`}
                onClick={() => setActiveVariant(option.size)}
              >
                {option.size}
              </button>
            ))}
          </div>
          <div className="h-5 w-px bg-gray-300"></div>
          <div className="text-sm flex items-center space-x-1">
            <span className="text-gray-700">CART</span>
            <span className="text-gray-400">(0)</span>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        {/* Left side - Product Showcase */}
        <div className="relative">
          <ParallaxEffect speed={0.1} direction="down" className="absolute -top-10 -left-10 w-40 h-40 z-0">
            <div className="rounded-full border border-gray-200 w-full h-full"></div>
          </ParallaxEffect>
          
          <ParallaxEffect speed={0.2} direction="up" className="absolute bottom-0 left-1/4 w-24 h-24 z-0">
            <div className="rounded-full border border-gray-300 w-full h-full"></div>
          </ParallaxEffect>
          
          <ParallaxEffect speed={0.15} className="relative z-10">
            <div className="relative bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl p-8 aspect-square flex items-center justify-center shadow-lg">
              <div 
                className="absolute inset-0 opacity-10 rounded-3xl"
                style={{ 
                  backgroundImage: 'url("/lovable-uploads/0983da8e-755c-4463-a28f-bd8d27624883.png")', 
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px)'
                }}
              ></div>
              <img 
                src="/lovable-uploads/0983da8e-755c-4463-a28f-bd8d27624883.png" 
                alt="Luxury Watch" 
                className="max-w-full max-h-full object-contain z-10 transform transition-all duration-700 hover:scale-110 hover:rotate-12"
              />
            </div>
          </ParallaxEffect>
          
          <div className="flex justify-center mt-8 space-x-4">
            {colorOptions.map((option) => (
              <button
                key={option.id}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${activeColor === option.color ? 'border-black scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                style={{ backgroundColor: option.color }}
                onClick={() => setActiveColor(option.color)}
                aria-label={`Select ${option.name} color`}
              />
            ))}
          </div>
        </div>
        
        {/* Right side - Product Details */}
        <div className="relative">
          <ParallaxEffect speed={0.3} direction="left" className="mb-16">
            <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">Take Plus+</div>
            <div className="text-sm uppercase tracking-wider mb-6">Two Colors</div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-1">
              YOUR
            </h2>
            <h3 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-1">
              RADIANT TIME
            </h3>
            <h4 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none mb-8 flex items-center">
              PIECE NEW HB 
              <span className="ml-4 text-2xl">+</span>
            </h4>
            
            <div className="flex items-center text-sm space-x-2 mb-6">
              <span className="font-medium">+{activeVariant} {activeColor === '#FF5500' ? 'ORANGE' : activeColor === '#000000' ? 'BLACK' : 'WHITE'}</span>
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: activeColor }}></div>
            </div>
            
            <div className="mb-10">
              <button className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-800 transition-colors">
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-gray-600 mb-8">
                INDULGE IN THE VIBRANT ALLURE OF MODERN {activeColor === '#FF5500' ? 'ORANGE' : activeColor === '#000000' ? 'BLACK' : 'WHITE'} WATCHES (R93). 
                ELEVATE YOUR STYLE AND ENJOY EXCLUSIVE (DISCOUNT) ON OUR RADIANT TIMEPIECES.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-sm shadow-sm">
                  <div className="text-xs text-gray-500 mb-1">BLACK WATCH /</div>
                  <div className="text-xs font-medium">EXCLUSIVE</div>
                </div>
                
                <div className="bg-white p-4 rounded-sm shadow-sm">
                  <div className="text-2xl font-light">01</div>
                  <div className="text-xs text-gray-500">+30K HAPPY CUSTOMER</div>
                </div>
              </div>
            </div>
          </ParallaxEffect>
        </div>
      </div>
      
      {/* Product Gallery */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10">More Timepieces</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ParallaxEffect 
                key={product.id} 
                speed={0.1} 
                direction={index % 2 === 0 ? 'up' : 'down'} 
                delay={0.1 * index}
              >
                <div 
                  className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="aspect-square rounded-md bg-gradient-to-b from-white to-gray-100 flex items-center justify-center mb-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-medium mb-1 group-hover:text-fashion-black transition-colors">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-fashion-gray text-sm">${product.price.toFixed(2)}</p>
                    <div className="text-xs px-2 py-1 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">View</div>
                  </div>
                </div>
              </ParallaxEffect>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage;
