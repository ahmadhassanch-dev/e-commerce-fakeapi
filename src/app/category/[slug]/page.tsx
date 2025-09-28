'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/Button';
import { ProductGridSkeleton } from '@/components/Loading';

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = decodeURIComponent(params.slug as string);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'rating'>('name');

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const productsData = await api.getProductsByCategory(categorySlug);
        setProducts(productsData);
        setSortedProducts(productsData);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchCategoryProducts();
    }
  }, [categorySlug]);

  useEffect(() => {
    let sorted = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        sorted = sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted = sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted = sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        sorted = sorted.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
    }

    setSortedProducts(sorted);
  }, [products, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8 animate-pulse"></div>
          <ProductGridSkeleton />
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-8">
            The category you&apos;re looking for doesn&apos;t exist or has no products.
          </p>
          <Link href="/categories">
            <Button>
              <ArrowLeft className="mr-2" size={20} />
              Back to Categories
            </Button>
          </Link>
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
          <div className="flex items-center mb-4">
            <Link href="/categories" className="text-red-600 hover:text-red-700 transition-colors mr-4">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 capitalize">
              {categorySlug}
            </h1>
          </div>
          <p className="text-gray-600">
            Discover our collection of {categorySlug.toLowerCase()} products
          </p>
        </motion.div>

        {/* Sort Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-gray-600">
                Showing {sortedProducts.length} products
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "price-asc" | "price-desc" | "name" | "rating")}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch"
        >
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </motion.div>

        {/* Back to Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/categories">
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2" size={20} />
              Browse Other Categories
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}