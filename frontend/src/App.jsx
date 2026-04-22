import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Wishlist from './pages/Wishlist';
import CategoryProducts from './pages/CategoryProducts';
import Deals from './pages/Deals';
import WhatsNew from './pages/WhatsNew';
import Delivery from './pages/Delivery';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import OrderSuccess from './pages/OrderSuccess';

const App = () => {
  return (
    <Router>
      <PayPalScriptProvider options={{ 'client-id': 'sb' }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/placeorder" element={<PlaceOrder />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/category/:name" element={<CategoryProducts />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/whats-new" element={<WhatsNew />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/order-success/:id" element={<OrderSuccess />} />
              {/* Define other routes */}
              <Route path="*" element={<div className="container section">404 - Page Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PayPalScriptProvider>
    </Router>
  );
};

export default App;
