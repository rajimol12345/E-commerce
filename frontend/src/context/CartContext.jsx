import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const fetchCart = async () => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            setCartItems([]);
            setCartCount(0);
            return;
        }

        try {
            const { data } = await api.get('/cart');
            const items = data.cartItems || [];
            setCartItems(items);
            const count = items.reduce((acc, item) => acc + item.qty, 0);
            setCartCount(count);
            localStorage.setItem('cartCount', count);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        const savedCount = localStorage.getItem('cartCount');
        if (savedCount) {
            setCartCount(parseInt(savedCount));
        }
        fetchCart();
    }, []);

    const addToCart = async (product, qty = 1) => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            window.location.href = '/login?redirect=cart';
            return;
        }

        try {
            const { data } = await api.post('/cart', {
                productId: product._id || product,
                qty
            });
            const items = data.cartItems || [];
            setCartItems(items);
            const count = items.reduce((acc, item) => acc + item.qty, 0);
            setCartCount(count);
            localStorage.setItem('cartCount', count);
            return true;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await api.delete(`/cart/${productId}`);
            await fetchCart();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const updateCartQty = async (productId, qty) => {
        try {
            await api.put(`/cart/${productId}`, { qty });
            await fetchCart();
        } catch (error) {
            console.error('Error updating cart qty:', error);
        }
    };

    const clearCart = async () => {
        try {
            await api.delete('/cart');
            setCartItems([]);
            setCartCount(0);
            localStorage.setItem('cartCount', 0);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, clearCart, fetchCart, updateCartQty }}>
            {children}
        </CartContext.Provider>
    );
};
