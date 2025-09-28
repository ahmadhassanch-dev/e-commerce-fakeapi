'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Truck, Shield, Check, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { OrderDetails } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { state, isHydrated, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState<Partial<OrderDetails>>({});

  const handleInputChange = (field: keyof OrderDetails, value: string) => {
    setOrderDetails(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderDetails> = {};

    if (!orderDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!orderDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!orderDetails.email.trim()) newErrors.email = 'Email is required';
    if (!orderDetails.phone.trim()) newErrors.phone = 'Phone is required';
    if (!orderDetails.address.trim()) newErrors.address = 'Address is required';
    if (!orderDetails.city.trim()) newErrors.city = 'City is required';
    if (!orderDetails.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!orderDetails.country.trim()) newErrors.country = 'Country is required';

    // Email validation
    if (orderDetails.email && !/\S+@\S+\.\S+/.test(orderDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      router.push('/order-success');
    }, 2000);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              You need items in your cart to proceed to checkout.
            </p>
            <Link href="/products">
              <Button size="lg">
                <ArrowLeft className="mr-2" size={20} />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const total = state.total;
  const shipping = total >= 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Shield className="mr-2" size={16} />
              Secure Checkout
            </div>
            <div className="flex items-center">
              <Truck className="mr-2" size={16} />
              Fast Delivery
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      value={orderDetails.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      value={orderDetails.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      error={errors.lastName}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={orderDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      error={errors.email}
                      className="md:col-span-2"
                      required
                    />
                    <Input
                      label="Phone"
                      value={orderDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      error={errors.phone}
                      className="md:col-span-2"
                      required
                    />
                    <Input
                      label="Address"
                      value={orderDetails.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      error={errors.address}
                      className="md:col-span-2"
                      required
                    />
                    <Input
                      label="City"
                      value={orderDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      error={errors.city}
                      required
                    />
                    <Input
                      label="ZIP Code"
                      value={orderDetails.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      error={errors.zipCode}
                      required
                    />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="card"
                          name="paymentMethod"
                          value="card"
                          checked={orderDetails.paymentMethod === 'card'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="text-red-600"
                        />
                        <label htmlFor="card" className="flex items-center cursor-pointer">
                          <CreditCard className="mr-2" size={20} />
                          Credit/Debit Card
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={orderDetails.paymentMethod === 'paypal'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="text-red-600"
                        />
                        <label htmlFor="paypal" className="cursor-pointer">
                          PayPal
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="cod"
                          name="paymentMethod"
                          value="cod"
                          checked={orderDetails.paymentMethod === 'cod'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="text-red-600"
                        />
                        <label htmlFor="cod" className="cursor-pointer">
                          Cash on Delivery
                        </label>
                      </div>
                    </div>

                    {orderDetails.paymentMethod === 'card' && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Card Number"
                          placeholder="1234 5678 9012 3456"
                          className="md:col-span-2"
                        />
                        <Input
                          label="Expiry Date"
                          placeholder="MM/YY"
                        />
                        <Input
                          label="CVV"
                          placeholder="123"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2" size={20} />
                      Place Order (${finalTotal.toFixed(2)})
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                          <span className="text-sm font-medium">{item.quantity}×</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <hr />

                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {total >= 50 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <Check className="text-green-600 mr-2" size={16} />
                        <span className="text-sm text-green-800">
                          You qualify for free shipping!
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}