
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '@/types/product';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number, size?: string, color?: string) => void;
  updateQuantity: (productId: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const { toast } = useToast();

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Calculate total amount
  const totalAmount = cart.reduce(
    (total, item) => {
      const price = item.discount 
        ? item.price - (item.price * item.discount / 100) 
        : item.price;
      return total + price * item.quantity;
    }, 
    0
  );

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      // Check if the product (with the same size and color) is already in the cart
      const existingItemIndex = prevCart.findIndex(
        (item) => 
          item.id === product.id && 
          item.size === product.size && 
          item.color === product.color
      );

      if (existingItemIndex !== -1) {
        // If the product exists, update its quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += product.quantity;
        
        toast({
          title: "Cart updated",
          description: `Quantity updated for ${product.name}.`,
        });
        
        return updatedCart;
      } else {
        // If the product doesn't exist, add it to the cart
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
        
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (productId: number, size?: string, color?: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => 
          !(item.id === productId && 
          item.size === size && 
          item.color === color)
      );
      
      if (updatedCart.length < prevCart.length) {
        toast({
          title: "Removed from cart",
          description: "Item has been removed from your cart.",
        });
      }
      
      return updatedCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
