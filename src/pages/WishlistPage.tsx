import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '@/context/WishlistContext';
import { Button } from '@/components/ui/button';
import { HeartCrack, ShoppingBag } from 'lucide-react';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <HeartCrack className="h-16 w-16 mx-auto mb-6 text-gray-400" />
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Add products you love to your wishlist to easily find them later.
            </p>
            <Button 
              onClick={() => navigate('/')} 
              className="bg-fashion-black hover:bg-opacity-90"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-fashion-black transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                  <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </Link>
              <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove
                </Button>
                {/* Optional: Add to cart button directly from wishlist */}
                <Button 
                  size="sm" 
                  onClick={() => {
                    // Add to cart logic (simplified, assuming default size/color)
                    // You might want to navigate to product detail for selection
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
