import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Menu, X, User, Search, LogOut, LogIn, Heart } from 'lucide-react'; // Import Heart icon
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useWishlist } from '@/context/WishlistContext'; // Import useWishlist

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const { wishlist } = useWishlist(); // Use wishlist context
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false); // Close mobile menu after search
    }
  };

  const categories = ['Women', 'Men', 'Accessories', 'Sale'];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length; // Get wishlist item count

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl tracking-tighter">
            FASHION
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link key={category} to={`/category/${category.toLowerCase()}`} className="nav-link">
                {category}
              </Link>
            ))}
          </nav>

          {/* Icons and Search (Desktop) */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 w-48"
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                <Search className="h-5 w-5" />
              </Button>
            </form>
            {isAuthenticated ? (
              <Button variant="ghost" size="icon" className="hidden md:flex" onClick={handleLogout} title="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="hidden md:flex" title="Login">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {/* Wishlist Link */}
            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-fashion-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md animate-fade-in">
          <nav className="flex flex-col px-4 py-4">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 mr-2"
              />
              <Button type="submit" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            {categories.map((category) => (
              <Link 
                key={category} 
                to={`/category/${category.toLowerCase()}`} 
                className="py-3 border-b border-gray-100 text-fashion-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
            <div className="flex items-center space-x-4 mt-4">
              {isAuthenticated ? (
                <Button variant="outline" size="sm" className="flex-1" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Link to="/login" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
              {/* Mobile Wishlist Link */}
              <Link to="/wishlist" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist ({wishlistCount})
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
