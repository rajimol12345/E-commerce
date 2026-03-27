import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { FaTrash, FaArrowLeft, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const {
        cartItems: contextCartItems,
        fetchCart,
        removeFromCart,
        updateCartQty
    } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        setCartItems(contextCartItems);
        calculateSubtotal(contextCartItems);
    }, [contextCartItems]);

    const calculateSubtotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);
        setSubtotal(total);
    };

    const updateQtyHandler = (id, currentQty, delta) => {
        const newQty = currentQty + delta;
        if (newQty > 0) {
            updateCartQty(id, newQty);
        }
    };

    const removeFromCartHandler = async (id) => {
        try {
            await removeFromCart(id);
        } catch (error) {
            alert('Failed to remove item');
        }
    };

    const checkoutHandler = () => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=shipping');
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div style={{ padding: '80px 0', backgroundColor: '#FFFFFF', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#231F1E', margin: 0 }}>Your Cart</h1>
                    <Link to="/shop" style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: '#5F6C72', textDecoration: 'none', fontWeight: '600',
                        fontSize: '16px', transition: 'color 0.2s'
                    }}>
                        <FaArrowLeft size={14} />
                        Continue Shopping
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', padding: '80px 0', backgroundColor: '#F9F9F9', borderRadius: '24px' }}
                    >
                        <div style={{ color: '#E6E8EC', marginBottom: '24px' }}>
                            <FaShoppingBag size={64} />
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#231F1E', marginBottom: '16px' }}>Your cart is empty</h2>
                        <p style={{ color: '#5F6C72', marginBottom: '32px' }}>Looks like you haven't added anything yet.</p>
                        <Link to="/shop" className="btn btn-primary" style={{ padding: '16px 40px', borderRadius: '50px' }}>
                            Start Shopping
                        </Link>
                    </motion.div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(700px, 1fr))', gap: '40px' }}>

                        {/* Cart Items List */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                        >
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.product}
                                    variants={itemVariants}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: '#F9F9F9',
                                        padding: '24px',
                                        borderRadius: '24px',
                                        gap: '24px'
                                    }}
                                >
                                    <div style={{
                                        width: '100px', height: '100px',
                                        borderRadius: '16px',
                                        backgroundColor: '#FFFFFF',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        overflow: 'hidden', flexShrink: 0
                                    }}>
                                        <img
                                            src={item.image?.startsWith('http') ? item.image : `https://e-commerce-jh2x.onrender.com${item.image}`}
                                            alt={item.name}
                                            style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1 }}>
                                        <Link to={`/product/${item.product}`} style={{
                                            fontWeight: '700', fontSize: '18px', color: '#231F1E',
                                            textDecoration: 'none', display: 'block', marginBottom: '8px'
                                        }}>
                                            {item.name}
                                        </Link>
                                        <p style={{ color: '#0A6847', fontWeight: '700', fontSize: '16px', margin: 0 }}>
                                            ${item.price}
                                        </p>
                                    </div>

                                    {/* Quantity & Action */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                                        <div style={{
                                            backgroundColor: '#FFFFFF', padding: '10px 20px', borderRadius: '50px',
                                            display: 'flex', alignItems: 'center', gap: '20px',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                            border: '1px solid #E6E8EC'
                                        }}>
                                            <button
                                                onClick={() => updateQtyHandler(item.product, item.qty, -1)}
                                                disabled={item.qty <= 1}
                                                style={{
                                                    border: 'none', background: 'none', cursor: item.qty <= 1 ? 'not-allowed' : 'pointer',
                                                    color: item.qty <= 1 ? '#E6E8EC' : '#777E90', display: 'flex', alignItems: 'center'
                                                }}
                                            >
                                                <FaMinus size={12} />
                                            </button>
                                            <span style={{ fontWeight: '700', fontSize: '16px', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                                            <button
                                                onClick={() => updateQtyHandler(item.product, item.qty, 1)}
                                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#777E90', display: 'flex', alignItems: 'center' }}
                                            >
                                                <FaPlus size={12} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCartHandler(item.product)}
                                            style={{
                                                width: '40px', height: '40px',
                                                borderRadius: '50%', backgroundColor: '#FEE2E2',
                                                border: 'none', color: '#DC2626',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                cursor: 'pointer', transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{ height: 'fit-content' }}
                        >
                            <div style={{
                                backgroundColor: '#FFFFFF',
                                padding: '40px',
                                borderRadius: '32px',
                                border: '1px solid #E6E8EC',
                                boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
                            }}>
                                <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#231F1E', marginBottom: '32px' }}>Order Summary</h3>

                                <div style={{ display: 'flex', justify: 'space-between', marginBottom: '16px', color: '#5F6C72' }}>
                                    <span>Subtotal</span>
                                    <span style={{ fontWeight: '600', color: '#231F1E' }}>${subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justify: 'space-between', marginBottom: '16px', color: '#5F6C72' }}>
                                    <span>Shipping Estimate</span>
                                    <span style={{ fontWeight: '600', color: '#231F1E' }}>Calculated at Checkout</span>
                                </div>
                                <div style={{ display: 'flex', justify: 'space-between', marginBottom: '16px', color: '#5F6C72' }}>
                                    <span>Tax Estimate</span>
                                    <span style={{ fontWeight: '600', color: '#231F1E' }}>Calculated at Checkout</span>
                                </div>

                                <div style={{ height: '1px', backgroundColor: '#E6E8EC', margin: '24px 0' }}></div>

                                <div style={{ display: 'flex', justify: 'space-between', marginBottom: '32px' }}>
                                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#231F1E' }}>Order Total</span>
                                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#0A6847' }}>${subtotal.toFixed(2)}</span>
                                </div>

                                <motion.button
                                    onClick={checkoutHandler}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn btn-primary"
                                    style={{
                                        width: '100%',
                                        padding: '20px',
                                        fontSize: '18px',
                                        borderRadius: '50px',
                                        backgroundColor: '#003D29',
                                        boxShadow: '0 10px 20px rgba(0,61,41,0.2)'
                                    }}
                                >
                                    Proceed to Checkout
                                </motion.button>
                            </div>
                        </motion.div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
