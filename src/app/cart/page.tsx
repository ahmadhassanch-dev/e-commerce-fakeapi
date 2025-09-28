'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function CartPage() {
  const { state, isHydrated, updateQuantity, removeFromCart, clearCart } = useCart();

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
            className="mb-8"
          >
            <ShoppingBag size={80} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link href="/products">
              <Button size="lg" className="inline-flex items-center">
                <ArrowLeft className="mr-2" size={20} />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
              <p className="text-gray-600">{state.itemCount} items in your cart</p>
            </div>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {state.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-6 border-b border-gray-200 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link href={`/products/${item.id}`} className="hover:text-red-600 transition-colors">
                        <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Link href="/products">
                <Button variant="outline" className="inline-flex items-center">
                  <ArrowLeft className="mr-2" size={20} />
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
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
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{state.total >= 50 ? 'Free' : '$9.99'}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(state.total * 0.08).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>
                      ${(
                        state.total +
                        (state.total >= 50 ? 0 : 9.99) +
                        state.total * 0.08
                      ).toFixed(2)}
                    </span>
                  </div>

                  {state.total < 50 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        Add ${(50 - state.total).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}

                  <Link href="/checkout">
                    <Button size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <div className="text-center text-sm text-gray-500 mt-4">
                    Secure checkout with 256-bit SSL encryption
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}