'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/Loading';
import { ProductCard } from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await api.getProduct(productId);
        setProduct(productData);
        
        // Fetch related products from the same category
        const categoryProducts = await api.getProductsByCategory(productData.category);
        const filtered = categoryProducts.filter(p => p.id !== productId).slice(0, 4);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600">The product you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Category */}
              <div>
                <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(product.rating.rate)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <div className="prose prose-sm text-gray-600">
                <p>{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => updateQuantity(quantity - 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="flex-1 flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="flex items-center justify-center">
                  <Heart className="mr-2" size={20} />
                  Wishlist
                </Button>
                <Button variant="ghost" size="lg" className="flex items-center justify-center">
                  <Share2 className="mr-2" size={20} />
                  Share
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="text-red-600" size={20} />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <RotateCcw className="text-red-600" size={20} />
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="text-red-600" size={20} />
                  <span>Secure checkout</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}