'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      details: 'support@elitestore.com',
      description: 'Send us an email anytime!'
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      details: '123 Shopping Street, New York, NY 10001',
      description: 'Come say hello at our office'
    },
    {
      icon: <Clock size={24} />,
      title: 'Working Hours',
      details: 'Mon-Fri: 8am-6pm EST',
      description: 'Weekend support available'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <p className="text-green-800 flex items-center">
                        <Send className="mr-2" size={16} />
                        Thank you! Your message has been sent successfully.
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    
                    <Input
                      label="Subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Tell us how we can help you..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={20} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{info.title}</h4>
                        <p className="text-gray-900 font-medium">{info.details}</p>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Card */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold text-gray-900">Quick Help</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Order Issues?</h4>
                      <p className="text-sm text-gray-600">
                        Check your order status or contact us for immediate assistance.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Returns & Refunds</h4>
                      <p className="text-sm text-gray-600">
                        Easy 30-day return policy. No questions asked.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Product Questions</h4>
                      <p className="text-sm text-gray-600">
                        Need more details about a product? We&apos;re here to help.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Find answers to common questions about our products and services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How long does shipping take?",
                answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery."
              },
              {
                question: "What's your return policy?",
                answer: "We offer a 30-day return policy for all items in original condition with tags attached."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we ship to over 50 countries worldwide. Shipping costs vary by location."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email to monitor your package."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}