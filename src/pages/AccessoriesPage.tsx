import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ParallaxEffect from '@/components/home/ParallaxEffect';
import { getProductsByCategory } from '@/data/products';
import { Product } from '@/types/product';

function AccessoriesPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeColor, setActiveColor] = useState<string>('#bf988a'); // Default to Rosy Brown
  const [activeSize, setActiveSize] = useState<string>('35MM');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    
    // Removed simulated network request for faster loading
    const fetchedProducts = getProductsByCategory('Accessories');
    setProducts(fetchedProducts);
    
    // Set first product as active by default
    if (fetchedProducts.length > 0) {
      setActiveProduct(fetchedProducts[0]);
    }
    
    setLoading(false);
  }, []);

  const colorOptions = [
    { id: 'color1', color: '#bf988a', name: 'Rosy Brown' },
    { id: 'color2', color: '#247c6d', name: 'Pine Green' },
    { id: 'color3', color: '#031c26', name: 'Midnight Green' }
  ];

  const sizeOptions = [
    { id: 'size1', size: '35MM' },
    { id: 'size2', size: '40MM' }
  ];

  const handleColorChange = (color: string) => {
    setActiveColor(color);
  };

  const handleSizeChange = (size: string) => {
    setActiveSize(size);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!activeProduct) {
    return <div className="min-h-screen flex items-center justify-center">No accessory product found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-40" 
          style={{ 
            backgroundImage: 'url("/lovable-uploads/0983da8e-755c-4463-a28f-bd8d27624883.png")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)'
          }}
        ></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto px-4">
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
              {activeProduct.name}
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              {activeProduct.description}
            </p>
            <Button 
              className="px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105"
            >
              Discover More
            </Button>
          </div>
          <div className="lg:w-1/2 flex justify-center items-center relative h-96 w-96 lg:h-[600px] lg:w-[600px]">
            <ParallaxEffect speed={-5}>
              <div 
                className="relative flex items-center justify-center w-full h-full rounded-lg overflow-hidden"
              >
                <div 
                  className="absolute inset-0 z-0" 
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
                  className={`w-8 h-8 rounded-full border-2 ${activeColor === option.color ? 'border-blue-500' : 'border-gray-300'}`}
                  style={{ backgroundColor: option.color }}
                  onClick={() => handleColorChange(option.color)}
                  title={option.name}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-4">{activeProduct.name}</h2>
            <p className="text-xl text-gray-700 mb-6">${activeProduct.price.toFixed(2)}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Color: {colorOptions.find(opt => opt.color === activeColor)?.name}</h3>
              <div className="flex space-x-3">
                {colorOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${activeColor === option.color ? 'ring-2 ring-blue-500' : 'border-gray-300 hover:border-gray-400'}`}
                    style={{ backgroundColor: option.color }}
                    onClick={() => handleColorChange(option.color)}
                    title={option.name}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Size:</h3>
              <div className="flex space-x-3">
                {sizeOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`px-4 py-2 rounded-md border-2 transition-all duration-200 ${activeSize === option.size ? 'bg-gray-900 text-white' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                    onClick={() => handleSizeChange(option.size)}
                  >
                    {option.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Quantity:</h3>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 text-xl"
                >-</Button>
                <span className="text-xl font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 text-xl"
                >+</Button>
              </div>
            </div>

            <Button 
              className="w-full py-3 rounded-md text-lg transition-all duration-300 hover:bg-gray-800"
            >
              Add to Cart
            </Button>
          </div>

          <div>
            <p className="text-gray-700 leading-relaxed mb-6">
              {activeProduct.description}
            </p>
            
            <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Premium craftsmanship</li>
              <li>Durable materials</li>
              <li>Water-resistant design</li>
              <li>Limited edition</li>
            </ul>

            <div className="bg-gradient-to-br from-gray-100 to-white p-6 rounded-lg shadow-inner">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                A Symphony of Design and Precision
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Experience the perfect blend of aesthetic appeal and mechanical excellence. Each timepiece is a testament to timeless design and meticulous engineering.
              </p>
              <Button variant="link" className="px-0 text-blue-600 hover:text-blue-800">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products/Accessories Section (Example, if needed) */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Related Products</h2>
          {/* You would typically loop through related products here */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Example Product Card (replace with actual data) */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src="/public/placeholder.svg" alt="Related Product" className="mx-auto mb-4 w-48 h-48 object-cover"/>
              <h3 className="text-xl font-semibold mb-2">Elegant Chronograph</h3>
              <p className="text-gray-700 mb-4">$499.00</p>
              <Button>View Product</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccessoriesPage;
