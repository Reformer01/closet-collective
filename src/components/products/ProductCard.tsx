import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext'; // Import useWishlist
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); // Use wishlist hook
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add the product with default size and color
    addToCart({
      ...product,
      quantity: 1,
      size: product.sizes ? product.sizes[0] : undefined,
      color: product.colors ? product.colors[0] : undefined
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Calculate the sale price if there's a discount
  const salePrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : null;

  const isProductInWishlist = isInWishlist(product.id);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
          <img 
            src={product.image} 
            alt={product.name} 
            className={`w-full h-full object-cover object-center transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          <div className={`absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
          
          {product.isNew && (
            <div className="absolute top-3 left-3 bg-fashion-black text-white px-3 py-1 text-xs font-medium z-10">
              NEW
            </div>
          )}
          
          {product.discount && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 text-xs font-medium z-10">
              {product.discount}% OFF
            </div>
          )}
          
          <div className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md py-4 px-4 transform transition-transform duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="flex space-x-2">
              <Button 
                onClick={handleQuickAdd} 
                className="flex-1 bg-fashion-black hover:bg-black transition-colors"
                size="sm"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className={`flex-none border-fashion-black ${isProductInWishlist ? 'bg-red-500 text-white hover:bg-red-600' : 'hover:bg-fashion-black hover:text-white'} transition-all`}
                onClick={handleToggleWishlist}
                title={isProductInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <Heart className={`h-4 w-4 ${isProductInWishlist ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-fashion-black hover:bg-fashion-black hover:text-white transition-all"
                onClick={(e) => e.preventDefault()}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-1">
          <h3 className="font-medium text-gray-900 group-hover:text-fashion-black transition-colors">
            {product.name}
          </h3>
          <p className="text-fashion-gray">{product.category}</p>
          <div className="mt-1">
            {salePrice ? (
              <div className="flex items-center">
                <span className="text-red-500 font-medium">${salePrice}</span>
                <span className="ml-2 text-fashion-gray line-through text-sm">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
