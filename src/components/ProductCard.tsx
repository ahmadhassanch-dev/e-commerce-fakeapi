'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link href={`/products/${product.id}`}>
        <Card className="group cursor-pointer overflow-hidden h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-600 hover:text-white transition-colors"
                >
                  <ShoppingCart size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-600 hover:text-white transition-colors"
                >
                  <Heart size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-red-600 hover:text-white transition-colors"
                >
                  <Eye size={20} />
                </motion.button>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-2 left-2">
              <span className="bg-red-600 text-white px-2 py-1 rounded-md text-xs font-medium capitalize">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors flex-1">
              {product.title}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(product.rating.rate)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({product.rating.count})
              </span>
            </div>

            {/* Price and Button - Always at bottom */}
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};