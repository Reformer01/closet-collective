import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Share2, ArrowLeft, Star, Facebook, Twitter } from 'lucide-react'; // Removed Pinterest
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductDetailProps {
  product: Product | null;
  loading: boolean;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  author: string;
  date: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, loading }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  // State for reviews
  const [reviews, setReviews] = useState<Review[]>(
    product?.reviews || [] // Assuming product might have initial reviews
  );
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    author: '',
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">Sorry, the product you are looking for does not exist.</p>
        <Button onClick={() => navigate('/')} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    };

    if (product.colors && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    };

    addToCart({
      ...product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.rating === 0 || !newReview.comment.trim() || !newReview.author.trim()) {
      toast({
        title: "Missing Review Information",
        description: "Please provide a rating, comment, and your name for the review.",
        variant: "destructive",
      });
      return;
    };

    const reviewToAdd: Review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };

    setReviews(prevReviews => [...prevReviews, reviewToAdd]);
    setNewReview({ rating: 0, comment: '', author: '' });
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
  };

  const currentUrl = window.location.href;
  const shareTitle = `Check out this product: ${product.name}`;
  const shareText = `${product.description || product.name} - Buy now for $${product.price.toFixed(2)}!`;

  const getFacebookShareUrl = () => {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareTitle)}`;
  };

  const getTwitterShareUrl = () => {
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle + ". " + shareText)}`;
  };

  // Removed getPinterestShareUrl as Pinterest icon is not available from lucide-react

  // Calculate the sale price if there's a discount
  const salePrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : null;

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <Button 
        variant="ghost" 
        className="mb-8 hover:bg-transparent hover:text-fashion-black"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Price */}
          <div className="mb-6">
            {salePrice ? (
              <div className="flex items-center">
                <span className="text-xl text-red-500 font-medium">${salePrice}</span>
                <span className="ml-3 text-fashion-gray line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-xl font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Description */}
          <p className="text-fashion-gray mb-8">
            {product.description || "No description available."}
          </p>
          
          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border ${
                      selectedSize === size 
                        ? 'border-fashion-black bg-fashion-black text-white' 
                        : 'border-gray-300 hover:border-fashion-black'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color Selection */}
          {product.colors && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color 
                        ? 'border-fashion-black' 
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex border border-gray-300">
              <button 
                className="px-4 py-2 border-r border-gray-300 hover:bg-gray-100"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
              <button 
                className="px-4 py-2 border-l border-gray-300 hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              className="bg-fashion-black hover:bg-opacity-90 flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1 border-fashion-black">
              <Heart className="h-4 w-4 mr-2" />
              Add to Wishlist
            </Button>
          </div>
          
          {/* Share Buttons */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-fashion-gray mr-2">Share:</span>
            <a href={getFacebookShareUrl()} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5 text-blue-600" />
              </Button>
            </a>
            <a href={getTwitterShareUrl()} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5 text-blue-400" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Product Reviews Section */}
      <section className="mt-16 bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-fashion-gray mb-6">Be the first to review this product!</p>
        ) : (
          <div className="space-y-8 mb-8">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={i < review.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="ml-3 text-sm font-medium">{review.rating}/5 Stars</span>
                </div>
                <p className="font-semibold mb-1">{review.author}</p>
                <p className="text-sm text-fashion-gray mb-2">{review.date}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold mb-4">Write a Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <Label htmlFor="review-rating" className="mb-2 block">Your Rating</Label>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-8 w-8 cursor-pointer ${i < newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill={i < newReview.rating ? 'currentColor' : 'none'}
                  onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                />
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="review-comment" className="mb-2 block">Your Comment</Label>
            <Textarea
              id="review-comment"
              placeholder="Share your thoughts on the product..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="review-author" className="mb-2 block">Your Name</Label>
            <Input
              id="review-author"
              type="text"
              placeholder="John Doe"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
            />
          </div>
          <Button type="submit" className="bg-fashion-black hover:bg-opacity-90">
            Submit Review
          </Button>
        </form>
      </section>
    </div>
  );
};

export default ProductDetail;
