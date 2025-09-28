'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Clock, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    // Generate order number and delivery date on client side to avoid hydration mismatch
    setOrderNumber('ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    setEstimatedDelivery(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8"
          >
            <CheckCircle size={48} className="text-green-600" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Order Number</h3>
                    <p className="text-gray-600 font-mono">
                      {orderNumber || 'Loading...'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
                    <p className="text-gray-600">
                      {estimatedDelivery || 'Loading...'}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Order Processing</p>
                        <p className="text-sm text-gray-600">We&apos;re preparing your items for shipment</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Package size={16} className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Shipment</p>
                        <p className="text-sm text-gray-600">Your order will be shipped within 1-2 business days</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle size={16} className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Delivery</p>
                        <p className="text-sm text-gray-600">Your package will arrive at your doorstep</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <Button size="lg" className="inline-flex items-center">
                <Home className="mr-2" size={20} />
                Back to Home
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="inline-flex items-center">
                Continue Shopping
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-gray-600"
          >
            <p className="text-sm">
              A confirmation email has been sent to your email address.
              <br />
              Need help? <Link href="/contact" className="text-red-600 hover:underline">Contact our support team</Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}