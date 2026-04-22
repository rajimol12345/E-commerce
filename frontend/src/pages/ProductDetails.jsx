import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { FaStar, FaShoppingCart, FaTruck, FaUndo, FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

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
            toast.success('Added to cart!');
        } catch (error) {
            toast.error('Failed to add to cart');
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
        <div style={{ padding: '40px 0', backgroundColor: '#FFFFFF' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="product-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>

                    {/* Left Column: Image Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="product-image-container"
                        style={{
                            backgroundColor: '#F5F5F7',
                            borderRadius: '32px',
                            padding: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            minHeight: '400px'
                        }}
                    >
                        <motion.img
                            src={product.image?.startsWith('http') ? product.image : `https://e-commerce-jh2x.onrender.com${product.image}`}
                            alt={product.name}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '400px',
                                objectFit: 'contain',
                                mixBlendMode: 'multiply'
                            }}
                        />
                    </motion.div>

                    {/* Right Column: Product Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="product-info-container"
                    >
                        <h1 className="product-title" style={{
                            fontSize: '40px',
                            fontWeight: '800',
                            color: '#231F1E',
                            marginBottom: '16px',
                            lineHeight: 1.1
                        }}>
                            {product.name}
                        </h1>

                        <p className="product-desc" style={{
                            fontSize: '18px',
                            color: '#5F6C72',
                            marginBottom: '24px',
                            lineHeight: '1.6',
                            maxWidth: '100%'
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
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '15px'
                        }}>
                            <h2 style={{
                                fontSize: '36px',
                                fontWeight: '700',
                                color: '#0A6847',
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
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
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
                                onClick={() => navigate('/shipping')}
                                className="btn btn-primary"
                                style={{
                                    padding: '16px 30px',
                                    fontSize: '16px',
                                    borderRadius: '50px',
                                    backgroundColor: '#003D29',
                                    flex: '1 1 150px'
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
                                    padding: '16px 30px',
                                    fontSize: '16px',
                                    borderRadius: '50px',
                                    border: '2px solid #003D29',
                                    color: '#003D29',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    flex: '1 1 150px'
                                }}
                            >
                                <FaShoppingCart size={18} /> Add to Cart
                            </motion.button>
                        </div>

                        {/* Delivery Info */}
                        <div style={{ display: 'grid', gap: '20px' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'start', padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #E6E8EC', borderRadius: '16px' }}>
                                <div style={{
                                    width: '40px', height: '40px', flexShrink: 0,
                                    borderRadius: '10px', backgroundColor: '#FFF4E5',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#FFA500'
                                }}>
                                    <FaTruck size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px', color: '#231F1E' }}>Free Delivery</h4>
                                    <p style={{ fontSize: '13px', color: '#5F6C72', margin: 0 }}>Enter your postal code for availability</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'start', padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #E6E8EC', borderRadius: '16px' }}>
                                <div style={{
                                    width: '40px', height: '40px', flexShrink: 0,
                                    borderRadius: '10px', backgroundColor: '#FFF4E5',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: '#FFA500'
                                }}>
                                    <FaUndo size={20} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px', color: '#231F1E' }}>Return Delivery</h4>
                                    <p style={{ fontSize: '13px', color: '#5F6C72', margin: 0 }}>Free 30 days delivery returns</p>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
            <style>{`
                @media (max-width: 768px) {
                    .product-title {
                        font-size: 32px !important;
                    }
                    .product-image-container {
                        padding: 20px !important;
                        min-height: 300px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default ProductDetails;
