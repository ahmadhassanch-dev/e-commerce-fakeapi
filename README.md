# EliteStore - Premium E-commerce Platform

A modern, responsive e-commerce website built with Next.js 15, TypeScript, and Tailwind CSS. Features a beautiful UI with black, white, and red theme combination, smooth animations with Framer Motion, and complete shopping functionality using the FakeStore API.

## ✨ Features

### 🛍️ Complete E-commerce Experience
- **Product Catalog**: Browse all products with filtering and sorting
- **Category Navigation**: Shop by categories (Electronics, Clothing, Jewelry)
- **Product Details**: Detailed product pages with ratings and descriptions
- **Shopping Cart**: Add, remove, and update quantities
- **Checkout Process**: Complete order flow with form validation
- **Order Success**: Confirmation page with order tracking

### 🎨 Modern Design
- **Responsive Design**: Mobile-first approach, works on all devices
- **Beautiful UI**: Clean, modern interface with black, white, and red theme
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Interactive Elements**: Hover effects, loading states, and micro-interactions

### 🔧 Technical Features
- **Next.js 15**: Latest version with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Context API**: State management for shopping cart
- **API Integration**: FakeStore API for product data
- **Error Handling**: Comprehensive error states and validation

## 🚀 Pages & Functionality

### Main Pages
- **Home** (`/`) - Hero section, featured products, company features
- **Products** (`/products`) - Complete product catalog with filters
- **Product Detail** (`/products/[id]`) - Individual product pages
- **Categories** (`/categories`) - Category overview
- **Category Products** (`/category/[slug]`) - Products by category
- **Shopping Cart** (`/cart`) - Cart management
- **Checkout** (`/checkout`) - Order placement
- **Order Success** (`/order-success`) - Order confirmation
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and information

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **API**: FakeStore API (https://fakestoreapi.com)
- **State Management**: React Context API

## 📦 Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🌐 API Integration

This project uses the **FakeStore API** for product data:

```javascript
// Example API calls
fetch('https://fakestoreapi.com/products')           // All products
fetch('https://fakestoreapi.com/products/1')         // Single product
fetch('https://fakestoreapi.com/products/categories') // Categories
fetch('https://fakestoreapi.com/products/category/electronics') // By category
```

### Available Categories
- Electronics
- Jewelery
- Men's Clothing
- Women's Clothing

## 🎨 Design System

### Color Palette
- **Primary Red**: #DC2626 (Red-600)
- **Dark Red**: #B91C1C (Red-700)
- **Black**: #000000
- **White**: #FFFFFF
- **Gray Scale**: Gray-50 to Gray-900

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

## 🔄 State Management

### Cart Context
```typescript
interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Actions
addToCart(product: Product)
removeFromCart(id: number)
updateQuantity(id: number, quantity: number)
clearCart()
```

## 🚀 Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy on Vercel
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
