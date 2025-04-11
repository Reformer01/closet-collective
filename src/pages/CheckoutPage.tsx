
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';

// Payment method types
type PaymentMethod = 'credit-card' | 'paypal' | 'bank-transfer';

const CheckoutPage = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    saveInfo: false,
    notes: '',
    paymentMethod: 'credit-card' as PaymentMethod,
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, saveInfo: checked });
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data (simplified validation)
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would send data to a payment processor
    // and handle the payment flow

    // Show success toast
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    });

    // Clear cart
    clearCart();

    // Redirect to success page (in a real app)
    // For now, we'll just navigate back to home
    navigate('/');
  };

  // Redirect to cart if cart is empty
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Checkout Form - Left Side */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                  <Input 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
                  <Input 
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province <span className="text-red-500">*</span></Label>
                  <Input 
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip/Postal Code <span className="text-red-500">*</span></Label>
                  <Input 
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country">Country <span className="text-red-500">*</span></Label>
                  <Input 
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2 flex items-center">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="saveInfo" 
                      checked={formData.saveInfo}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="saveInfo" className="font-normal">
                      Save this information for next time
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Notes */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Order Notes (Optional)</h2>
              <Textarea 
                id="notes"
                name="notes"
                placeholder="Notes about your order, e.g. special delivery instructions"
                value={formData.notes}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <div 
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                    formData.paymentMethod === 'credit-card' ? 'border-black' : 'border-gray-200'
                  }`}
                  onClick={() => handlePaymentMethodChange('credit-card')}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.paymentMethod === 'credit-card' ? 'border-black' : 'border-gray-300'
                  }`}>
                    {formData.paymentMethod === 'credit-card' && (
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="ml-2">Credit Card</span>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                    formData.paymentMethod === 'paypal' ? 'border-black' : 'border-gray-200'
                  }`}
                  onClick={() => handlePaymentMethodChange('paypal')}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.paymentMethod === 'paypal' ? 'border-black' : 'border-gray-300'
                  }`}>
                    {formData.paymentMethod === 'paypal' && (
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="ml-2">PayPal</span>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                    formData.paymentMethod === 'bank-transfer' ? 'border-black' : 'border-gray-200'
                  }`}
                  onClick={() => handlePaymentMethodChange('bank-transfer')}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.paymentMethod === 'bank-transfer' ? 'border-black' : 'border-gray-300'
                  }`}>
                    {formData.paymentMethod === 'bank-transfer' && (
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span className="ml-2">Bank Transfer</span>
                </div>
              </div>
              
              {formData.paymentMethod === 'credit-card' && (
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number <span className="text-red-500">*</span></Label>
                    <Input 
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardHolder">Card Holder <span className="text-red-500">*</span></Label>
                    <Input 
                      id="cardHolder"
                      name="cardHolder"
                      placeholder="John Doe"
                      value={formData.cardHolder}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date <span className="text-red-500">*</span></Label>
                      <Input 
                        id="expiryDate"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV <span className="text-red-500">*</span></Label>
                      <Input 
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => navigate('/cart')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Cart
              </Button>
              
              <Button 
                type="submit"
                className="bg-fashion-black hover:bg-opacity-90 flex-1"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Complete Order
              </Button>
            </div>
          </form>
        </div>
        
        {/* Order Summary - Right Side */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {cart.map((item) => {
                  const price = item.discount 
                    ? (item.price - (item.price * item.discount / 100)) 
                    : item.price;
                  
                  return (
                    <div 
                      key={`${item.id}-${item.size}-${item.color}`} 
                      className="flex justify-between border-b pb-2"
                    >
                      <div className="flex">
                        <span className="text-fashion-gray mr-2">{item.quantity}x</span>
                        <span>{item.name}</span>
                        {item.size && <span className="text-fashion-gray ml-1">({item.size})</span>}
                      </div>
                      <span className="font-medium">${(price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              
              {/* Subtotal and Other Costs */}
              <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(totalAmount * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              {/* Total */}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(totalAmount + (totalAmount * 0.08)).toFixed(2)}</span>
              </div>
              
              {/* Discount Code */}
              <div className="mt-4 flex space-x-2">
                <Input 
                  placeholder="Discount code"
                  className="flex-1"
                />
                <Button variant="outline">Apply</Button>
              </div>
              
              {/* Secure Checkout Notice */}
              <div className="bg-gray-100 p-4 mt-6 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Secure Checkout</span>
                </div>
                <p className="text-sm text-fashion-gray text-center">
                  Your payment information is processed securely. We do not store credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
