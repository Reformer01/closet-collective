
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // In a real application, this would redirect to a checkout page
    toast({
      title: "Checkout",
      description: "This would normally redirect to a checkout page.",
    });
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-fashion-gray" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-fashion-gray mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button 
            onClick={() => navigate('/')} 
            className="bg-fashion-black hover:bg-opacity-90"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {/* Headers - Desktop */}
            <div className="hidden md:grid grid-cols-5 p-4 bg-gray-50 border-b border-gray-200">
              <div className="col-span-2">
                <span className="font-medium">Product</span>
              </div>
              <div className="text-center">
                <span className="font-medium">Price</span>
              </div>
              <div className="text-center">
                <span className="font-medium">Quantity</span>
              </div>
              <div className="text-right">
                <span className="font-medium">Total</span>
              </div>
            </div>
            
            {/* Cart Items */}
            {cart.map((item) => {
              const price = item.discount 
                ? (item.price - (item.price * item.discount / 100)) 
                : item.price;
              
              return (
                <div 
                  key={`${item.id}-${item.size}-${item.color}`} 
                  className="grid grid-cols-1 md:grid-cols-5 p-4 border-b border-gray-200 gap-4"
                >
                  {/* Product Image and Info */}
                  <div className="col-span-2 flex">
                    <div className="w-20 h-20 bg-gray-100 mr-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <Link 
                        to={`/product/${item.id}`} 
                        className="font-medium hover:text-fashion-black transition-colors"
                      >
                        {item.name}
                      </Link>
                      <div className="text-sm text-fashion-gray mt-1">
                        {item.size && <span>Size: {item.size}</span>}
                        {item.size && item.color && <span> / </span>}
                        {item.color && (
                          <span>
                            Color: <span className="inline-block w-3 h-3 rounded-full align-middle ml-1" style={{ backgroundColor: item.color }}></span>
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size, item.color)} 
                        className="text-sm text-red-500 flex items-center mt-2 hover:text-red-600 transition-colors md:hidden"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:text-center flex md:block items-center">
                    <span className="text-sm font-medium md:hidden mr-2">Price:</span>
                    {item.discount ? (
                      <div className="flex md:justify-center items-center">
                        <span className="font-medium text-red-500">${price.toFixed(2)}</span>
                        <span className="ml-2 text-fashion-gray line-through text-sm">${item.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="font-medium">${price.toFixed(2)}</span>
                    )}
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:text-center flex items-center">
                    <span className="text-sm font-medium md:hidden mr-2">Quantity:</span>
                    <div className="flex border border-gray-300 inline-flex md:mx-auto">
                      <button 
                        className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.size, item.color)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center">{item.quantity}</span>
                      <button 
                        className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total & Remove Button */}
                  <div className="md:text-right flex justify-between items-center">
                    <div className="flex items-center md:hidden">
                      <span className="text-sm font-medium mr-2">Total:</span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium md:ml-auto">${(price * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size, item.color)} 
                        className="text-red-500 p-1 hover:text-red-600 transition-colors hidden md:block"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Cart Actions */}
            <div className="p-4 bg-gray-50 flex justify-between">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="text-fashion-gray"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearCart}
                className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between pb-3 border-b border-gray-200">
                <span>Subtotal</span>
                <span className="font-medium">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-200">
                <span>Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-200">
                <span>Tax</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout} 
              className="w-full bg-fashion-black hover:bg-opacity-90"
            >
              Proceed to Checkout
            </Button>
            
            <div className="mt-6 text-sm text-center text-fashion-gray">
              <p>We accept payment methods:</p>
              <div className="flex justify-center space-x-2 mt-2">
                <span className="p-1 px-2 border border-gray-300 rounded">Visa</span>
                <span className="p-1 px-2 border border-gray-300 rounded">Mastercard</span>
                <span className="p-1 px-2 border border-gray-300 rounded">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
