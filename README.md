# Shopping Website with React and Fake Store API

![React](https://img.shields.io/badge/React-18.2.0-blue)
![React Router](https://img.shields.io/badge/React%20Router-6.15.0-red)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.3-38bdf8)
![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF)

A fully responsive e-commerce web application built with React that interfaces with the Fake Store API. This project includes authentication, product browsing, cart management, and a smooth checkout process.

## 🚀 Live Demo

[Visit the live demo](https://your-deployment-url.vercel.app)

## ✨ Features

### Authentication
- Login with username/password via JWT
- Authenticated routes protection
- Automatic redirection based on authentication state

### Product Management
- Browse all products
- Filter products by category
- Search products by title or description
- View detailed product information

### Shopping Cart
- Add products to cart with quantity selection
- View cart contents
- Update product quantities in cart
- Remove products from cart
- Calculate total price
- Checkout functionality with confirmation message

### User Interface
- Responsive, mobile-first design
- Clean and intuitive UI with Tailwind CSS
- Loading states and error handling
- Animated notifications

## 🛠️ Tech Stack

- **Frontend Framework:** React.js with Hooks
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **State Management:** React Context API (for auth and cart)
- **Build Tool:** Vite
- **API:** [Fake Store API](https://fakestoreapi.com/docs)
- **Deployment:** Vercel/Netlify

## 📋 Prerequisites

- Node.js (v14+)
- npm or yarn

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/shopping-website.git
cd shopping-website
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to
```
http://localhost:3000
```

## 📝 Usage Guide

### Login

Use the following credentials to log in:
- Username: `mor_2314`
- Password: `83r5^_`

### Browsing Products

- View all products on the home page
- Use the category dropdown to filter products
- Use the search bar to find products by name or description

### Product Details

- Click on any product card to view detailed information
- Select quantity and add products to cart from the detail page

### Shopping Cart

- View your cart by clicking the Cart link in the header
- Adjust quantities or remove items as needed
- Click "Checkout" to complete your purchase

## 📂 Project Structure

```
shopping-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── CartPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   └── ProductListingPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🔑 API Integration

This project uses the Fake Store API for authentication and product data:

- **Authentication:** `/auth/login` with username and password
- **Products:** 
  - Get all products: `/products`
  - Get product by ID: `/products/{id}`
  - Get products by category: `/products/category/{category}`
  - Get all categories: `/products/categories`

## 🎨 Screenshots

![Login Screen](https://placeholder-for-login-screenshot.com)
![Product Listing](https://placeholder-for-product-listing-screenshot.com)
![Product Detail](https://placeholder-for-product-detail-screenshot.com)
![Shopping Cart](https://placeholder-for-cart-screenshot.com)

## 📱 Responsive Design

The application is built with a mobile-first approach and is fully responsive across all device sizes:

- Mobile (320px - 767px)
- Tablet (768px - 1023px)
- Desktop (1024px+)

## 🧪 Test Users

For testing purposes, you can use the following credential:
- Username: `mor_2314`
- Password: `83r5^_`

## 📈 Future Improvements

- User registration
- Order history
- Wishlist functionality
- Product reviews
- Payment integration

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/shopping-website/issues).

## 📄 License

This project is [MIT](LICENSE) licensed.

## 🙏 Acknowledgements

- [Fake Store API](https://fakestoreapi.com) for providing the backend API
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [React Router](https://reactrouter.com) for navigation
- [Vite](https://vitejs.dev) for the build tooling
