
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

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

  // Calculate the sale price if there's a discount
  const salePrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : null;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="relative overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-fashion-black text-white px-2 py-1 text-xs font-medium">
            NEW
          </div>
        )}
        
        {product.discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 text-xs font-medium">
            {product.discount}% OFF
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm py-3 px-4 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button 
            onClick={handleQuickAdd} 
            className="w-full bg-fashion-black hover:bg-opacity-90"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium text-gray-900 group-hover:text-fashion-black transition-colors">
          {product.name}
        </h3>
        <p className="text-fashion-gray mt-1">{product.category}</p>
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
  );
};

export default ProductCard;
