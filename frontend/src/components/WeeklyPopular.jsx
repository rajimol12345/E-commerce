import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const WeeklyPopular = () => {
    const { addToCart: contextAddToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState(new Set());

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const [productsRes, wishlistRes] = await Promise.all([
                    api.get('/products?limit=10'),
                    api.get('/wishlist').catch(() => ({ data: { products: [] } }))
                ]);

                const allProducts = productsRes.data.products || productsRes.data || [];
                // Use different slice than other sections
                setProducts(allProducts.slice(1, 7));

                const wishProducts = wishlistRes.data.products || [];
                setFavorites(new Set(wishProducts.map(p => p._id || p)));
            } catch (error) {
                console.error('Error fetching popular products:', error);
            }
        };
        fetchPopular();
    }, []);

    const toggleFavorite = async (productId) => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            window.location.href = '/login?redirect=wishlist';
            return;
        }

        try {
            await api.post('/wishlist', { productId });
            setFavorites(prev => {
                const newFavorites = new Set(prev);
                if (newFavorites.has(productId)) {
                    newFavorites.delete(productId);
                } else {
                    newFavorites.add(productId);
                }
                return newFavorites;
            });
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
    };

    const handleAddToCart = async (product) => {
        try {
            await contextAddToCart(product, 1);
            alert('Added to cart!');
        } catch (error) {
            alert('Failed to add to cart');
        }
    };

    return (
        <section style={{ padding: '100px 0', backgroundColor: '#FFFFFF' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
                    <div>
                        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>Weekly Popular Products</h2>
                        <p style={{ color: '#6B7280', fontSize: '16px', margin: 0 }}>Discover what everyone else is loving this week</p>
                    </div>
                    <Link to="/shop" style={{ color: '#003D29', fontWeight: '700', textDecoration: 'none', borderBottom: '2px solid #003D29', paddingBottom: '4px' }}>
                        View All Products
                    </Link>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: '30px'
                }}>
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                backgroundColor: '#F9FAFB',
                                borderRadius: '24px',
                                padding: '30px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '24px',
                                transition: 'all 0.3s',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'white';
                                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#F9FAFB';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            {/* Favorite */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleFavorite(product._id);
                                }}
                                style={{
                                    position: 'absolute', top: '20px', right: '20px',
                                    background: 'white', border: 'none', borderRadius: '50%',
                                    width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', zIndex: 2
                                }}
                            >
                                {favorites.has(product._id) ? <FaHeart color="#FF6B6B" /> : <FaRegHeart color="#9CA3AF" />}
                            </button>

                            {/* Image */}
                            <Link to={`/product/${product._id}`} style={{ width: '130px', height: '130px', backgroundColor: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px' }}>
                                <img
                                    src={product.image?.startsWith('http') ? product.image : `https://e-commerce-jh2x.onrender.com${product.image}`}
                                    alt={product.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                            </Link>

                            {/* Content */}
                            <div style={{ flex: 1 }}>
                                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0', lineHeight: 1.3 }}>{product.name}</h3>
                                </Link>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} color={i < Math.floor(product.rating || 4) ? '#FBBF24' : '#E5E7EB'} size={12} />
                                        ))}
                                    </div>
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginLeft: '4px' }}>{product.rating}</span>
                                    <span style={{ fontSize: '13px', color: '#9CA3AF' }}>({product.numReviews})</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '22px', fontWeight: '800', color: '#003D29' }}>${product.price}</span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        style={{
                                            width: '40px', height: '40px', borderRadius: '50%', border: 'none',
                                            backgroundColor: '#003D29', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 61, 41, 0.2)', transition: 'transform 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <FaShoppingCart size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WeeklyPopular;
