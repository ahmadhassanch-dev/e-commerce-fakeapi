'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { icon: <Users size={32} />, value: '10,000+', label: 'Happy Customers' },
    { icon: <Award size={32} />, value: '5,000+', label: 'Products Sold' },
    { icon: <Globe size={32} />, value: '50+', label: 'Countries Served' },
    { icon: <Heart size={32} />, value: '99%', label: 'Customer Satisfaction' },
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We carefully curate every product to ensure the highest quality standards.',
      icon: '🏆'
    },
    {
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We listen and adapt to your needs.',
      icon: '👥'
    },
    {
      title: 'Innovation',
      description: 'We constantly evolve to bring you the latest trends and technologies.',
      icon: '💡'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to environmental responsibility in everything we do.',
      icon: '🌱'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About EliteStore</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We&apos;re more than just an e-commerce platform. We&apos;re your trusted partner in discovering 
              premium quality products that enhance your lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, EliteStore began with a simple mission: to make premium quality 
                  products accessible to everyone. What started as a small online store has grown 
                  into a trusted marketplace serving customers worldwide.
                </p>
                <p>
                  We believe that shopping should be an enjoyable experience. That&apos;s why we&apos;ve 
                  carefully designed every aspect of our platform to be intuitive, secure, and 
                  customer-focused.
                </p>
                <p>
                  Today, we&apos;re proud to work with hundreds of trusted suppliers and brands to 
                  bring you an ever-growing selection of products across multiple categories.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-red-100">
                  To revolutionize online shopping by providing exceptional products, 
                  outstanding customer service, and an unparalleled user experience that 
                  exceeds expectations every time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate people behind EliteStore
            </p>
          </motion.div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-8 max-w-2xl mx-auto"
            >
              <p className="text-gray-600 mb-6">
                Our diverse team of professionals works tirelessly to ensure you have the best 
                possible shopping experience. From our customer service representatives to our 
                tech team, everyone is committed to excellence.
              </p>
              <p className="text-red-600 font-medium">
                We&apos;re always looking for talented individuals to join our team!
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}