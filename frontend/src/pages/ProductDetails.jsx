import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { FaStar, FaShoppingCart, FaTruck, FaUndo, FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);

    const handleAddToCart = async () => {
        try {
            await addToCart(id, qty);
            alert('Added to cart!');
        } catch (error) {
            alert('Failed to add to cart');
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    if (loading) return (
        <div style={{ padding: '80px 0', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#003D29' }}>Loading Product...</div>
        </div>
    );

    if (!product) return (
        <div style={{ padding: '80px 0', textAlign: 'center' }}>Product not found</div>
    );

    return (
        <div style={{ padding: '80px 0', backgroundColor: '#FFFFFF' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '80px', alignItems: 'start' }}>

                    {/* Left Column: Image Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            backgroundColor: '#F5F5F7',
                            borderRadius: '32px',
                            padding: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            minHeight: '500px'
                        }}
                    >
                        <motion.img
                            src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`}
                            alt={product.name}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '450px',
                                objectFit: 'contain',
                                mixBlendMode: 'multiply' // Helps if image has white bg
                            }}
                        />
                    </motion.div>

                    {/* Right Column: Product Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h1 style={{
                            fontSize: '48px',
                            fontWeight: '800',
                            color: '#231F1E',
                            marginBottom: '16px',
                            lineHeight: 1.1
                        }}>
                            {product.name}
                        </h1>

                        <p style={{
                            fontSize: '18px',
                            color: '#5F6C72',
                            marginBottom: '24px',
                            lineHeight: '1.6',
                            maxWidth: '90%'
                        }}>
                            {product.description}
                        </p>

                        {/* Rating Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
                            <div style={{ display: 'flex', color: '#FFD200', fontSize: '18px' }}>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} color={i < product.rating ? '#FFD200' : '#E6E8EC'} />
                                ))}
                            </div>
                            <span style={{ fontSize: '16px', fontWeight: '500', color: '#231F1E' }}>
                                ({product.numReviews} Reviews)
                            </span>
                        </div>

                        {/* Price Row */}
                        <div style={{
                            padding: '24px 0',
                            borderTop: '1px solid #E6E8EC',
                            borderBottom: '1px solid #E6E8EC',
                            marginBottom: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <h2 style={{
                                fontSize: '42px',
                                fontWeight: '700',
                                color: '#0A6847', // Deep Green
                                margin: 0
                            }}>
                                ${product.price ? product.price.toFixed(2) : '0.00'}
                            </h2>
                            {product.countInStock > 0 ? (
                                <span style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#E7F7F0',
                                    color: '#0A6847',
                                    borderRadius: '50px',
                                    fontWeight: '600',
                                    fontSize: '14px'
                                }}>
                                    In Stock
                                </span>
                            ) : (
                                <span style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#FEE2E2',
                                    color: '#DC2626',
                                    borderRadius: '50px',
                                    fontWeight: '600',
                                    fontSize: '14px'
                                }}>
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Actions Row */}
                        <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
                            {/* Quantity Counter */}
                            <div style={{
                                backgroundColor: '#F5F6F8',
                                borderRadius: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 8px'
                            }}>
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    style={{
                                        width: '40px', height: '40px',
                                        borderRadius: '50%', backgroundColor: 'white', border: 'none',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <FaMinus size={12} />
                                </button>
                                <span style={{ margin: '0 20px', fontWeight: '700', fontSize: '18px', minWidth: '20px', textAlign: 'center' }}>
                                    {qty}
                                </span>
                                <button
                                    onClick={() => setQty(qty + 1)}
                                    style={{
                                        width: '40px', height: '40px',
                                        borderRadius: '50%', backgroundColor: 'white', border: 'none',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <FaPlus size={12} />
                                </button>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/shipping')} // Buy Now
                                className="btn btn-primary"
                                style={{
                                    padding: '16px 40px',
                                    fontSize: '16px',
                                    borderRadius: '50px',
                                    backgroundColor: '#003D29',
                                    flex: 1,
                                    maxWidth: '220px'
                                }}
                            >
                                Buy Now
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="btn btn-outline"
                                style={{
                                    padding: '16px 40px',
                                    fontSize: '16px',
                                    borderRadius: '50px',
                                    border: '2px solid #003D29',
                                    color: '#003D29',
                                    paddingRight: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    flex: 1,
                                    maxWidth: '220px'
                                }}
                            >
                                <FaShoppingCart size={18} /> Add to Cart
                            </motion.button>
                        </div>

                        {/* Delivery Info */}
                        <div style={{ display: 'grid', gap: '24px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'start', padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #E6E8EC', borderRadius: '16px' }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    borderRadius: '12px', backgroundColor: '#FFF4E5',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#FFA500'
                                }}>
                                    <FaTruck size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#231F1E' }}>Free Delivery</h4>
                                    <p style={{ fontSize: '14px', color: '#5F6C72', margin: 0 }}>Enter your postal code for delivery availability</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'start', padding: '24px', backgroundColor: '#FFFFFF', border: '1px solid #E6E8EC', borderRadius: '16px' }}>
                                <div style={{
                                    width: '48px', height: '48px',
                                    borderRadius: '12px', backgroundColor: '#FFF4E5',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#FFA500'
                                }}>
                                    <FaUndo size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#231F1E' }}>Return Delivery</h4>
                                    <p style={{ fontSize: '14px', color: '#5F6C72', margin: 0 }}>Free 30 days delivery returns. Details here</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
