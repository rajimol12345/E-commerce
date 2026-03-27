import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/login?redirect=wishlist');
            return;
        }

        try {
            const { data } = await api.get('/wishlist');
            setWishlistItems(data.products || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleWishlist = async (productId) => {
        try {
            await api.post('/wishlist', { productId });
            setWishlistItems(prev => prev.filter(item => item._id !== productId));
        } catch (error) {
            console.error(error);
        }
    };

    const addToCart = async (product) => {
        try {
            await api.post('/cart', {
                productId: product._id,
                qty: 1
            });
            alert('Added to cart!');
        } catch (error) {
            alert('Failed to add to cart: ' + (error.response?.data?.message || 'Server error'));
        }
    };

    if (loading) return <div style={{ padding: '80px', textAlign: 'center' }}>Loading Wishlist...</div>;

    return (
        <div style={{ padding: '80px 0', backgroundColor: '#F9FAFB', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#231F1E', margin: 0 }}>My Wishlist</h1>
                    <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5F6C72', textDecoration: 'none', fontWeight: '600' }}>
                        <FaArrowLeft size={14} /> Continue Shopping
                    </Link>
                </div>

                {wishlistItems.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '80px 0', backgroundColor: 'white', borderRadius: '32px' }}>
                        <FaHeart size={64} color="#E6E8EC" style={{ marginBottom: '24px' }} />
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#231F1E' }}>Your wishlist is empty</h2>
                        <p style={{ color: '#5F6C72', marginBottom: '32px' }}>See something you like? Add it to your wishlist to save it for later.</p>
                        <Link to="/shop" className="btn btn-primary" style={{ padding: '16px 40px', borderRadius: '50px' }}>Explore Products</Link>
                    </motion.div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                        {wishlistItems.map((product) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ backgroundColor: 'white', borderRadius: '24px', padding: '24px', position: 'relative', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
                            >
                                <button
                                    onClick={() => toggleWishlist(product._id)}
                                    style={{ position: 'absolute', top: '16px', right: '16px', background: '#FEE2E2', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#DC2626' }}
                                >
                                    <FaTrash size={14} />
                                </button>

                                <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', backgroundColor: '#F9FAFB', borderRadius: '16px', padding: '16px' }}>
                                    <img
                                        src={product.image?.startsWith('http') ? product.image : `https://e-commerce-jh2x.onrender.com${product.image}`}
                                        alt={product.name}
                                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                    />
                                </div>

                                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#231F1E', marginBottom: '8px' }}>{product.name}</h3>
                                <div style={{ color: '#0A6847', fontWeight: '800', fontSize: '20px', marginBottom: '20px' }}>${product.price ? product.price.toFixed(2) : '0.00'}</div>

                                <button
                                    onClick={() => addToCart(product)}
                                    style={{ width: '100%', padding: '14px', backgroundColor: '#003D29', color: 'white', border: 'none', borderRadius: '50px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                >
                                    <FaShoppingCart size={14} /> Add to Cart
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
