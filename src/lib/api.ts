import { Product } from '@/types';

const BASE_URL = 'https://fakestoreapi.com';

export const api = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  // Get single product
  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch products by category');
    return response.json();
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  // Get limited products
  getLimitedProducts: async (limit: number): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch limited products');
    return response.json();
  },

  // Get sorted products
  getSortedProducts: async (sort: 'asc' | 'desc'): Promise<Product[]> => {
    const response = await fetch(`${BASE_URL}/products?sort=${sort}`);
    if (!response.ok) throw new Error('Failed to fetch sorted products');
    return response.json();
  },
};