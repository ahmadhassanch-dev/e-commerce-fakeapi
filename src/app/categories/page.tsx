'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShirtIcon, WatchIcon, GemIcon, SmartphoneIcon } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/Loading';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await api.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "men's clothing":
        return <ShirtIcon size={40} className="text-red-600" />;
      case "women's clothing":
        return <GemIcon size={40} className="text-red-600" />;
      case "jewelery":
        return <WatchIcon size={40} className="text-red-600" />;
      case "electronics":
        return <SmartphoneIcon size={40} className="text-red-600" />;
      default:
        return <ShirtIcon size={40} className="text-red-600" />;
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category.toLowerCase()) {
      case "men's clothing":
        return "Discover the latest trends in men's fashion";
      case "women's clothing":
        return "Elegant and stylish clothing for women";
      case "jewelery":
        return "Beautiful jewelry pieces for every occasion";
      case "electronics":
        return "Latest gadgets and electronic devices";
      default:
        return "Explore our premium collection";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our carefully curated categories and find exactly what you&apos;re looking for
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/category/${encodeURIComponent(category)}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="p-4 bg-gray-50 rounded-full group-hover:bg-red-50 transition-colors">
                        {getCategoryIcon(category)}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 capitalize group-hover:text-red-600 transition-colors">
                      {category}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {getCategoryDescription(category)}
                    </p>
                    <Button variant="outline" className="group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all">
                      Explore Category
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Browse our complete collection of products across all categories
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  );
}