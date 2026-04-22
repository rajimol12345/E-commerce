import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaTruck, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '../utils/api';

const OrderSuccess = () => {
    const { id: orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${orderId}`);
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order for success page:', error);
            } finally {
                setLoading(false);
            }
        };
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '60px 20px' }}>
            <div className="container" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                    style={{ 
                        width: '100px', 
                        height: '100px', 
                        backgroundColor: '#DCFCE7', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        margin: '0 auto 32px' 
                    }}
                >
                    <FaCheckCircle size={50} color="#059669" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ fontSize: '36px', fontWeight: '800', color: '#111827', marginBottom: '16px' }}
                >
                    Order Placed Successfully!
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: '18px', color: '#6B7280', marginBottom: '40px', lineHeight: '1.6' }}
                >
                    Thank you for your purchase. Your order <strong>#{orderId?.substring(0, 8)}</strong> has been received and is being processed.
                </motion.p>

                {order && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        style={{ 
                            backgroundColor: 'white', 
                            padding: '32px', 
                            borderRadius: '24px', 
                            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                            textAlign: 'left',
                            marginBottom: '40px'
                        }}
                    >
                        <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px', borderBottom: '1px solid #F3F4F6', paddingBottom: '12px' }}>
                            Order Summary
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6B7280' }}>Status</span>
                                <span style={{ fontWeight: '700', color: '#059669' }}>{order.isPaid ? 'Paid' : 'Awaiting Payment'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6B7280' }}>Delivery</span>
                                <span style={{ fontWeight: '700' }}>3-5 Business Days</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#6B7280' }}>Total Amount</span>
                                <span style={{ fontWeight: '800', color: '#003D29', fontSize: '18px' }}>${order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                    <Link 
                        to="/shop" 
                        style={{ 
                            backgroundColor: '#003D29', 
                            color: 'white', 
                            padding: '18px 32px', 
                            borderRadius: '50px', 
                            textDecoration: 'none', 
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: '0 4px 12px rgba(0, 61, 41, 0.2)'
                        }}
                    >
                        <FaShoppingBag /> Continue Shopping
                    </Link>
                    <Link 
                        to={`/order/${orderId}`} 
                        style={{ 
                            color: '#374151', 
                            textDecoration: 'none', 
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            fontSize: '15px'
                        }}
                    >
                        View Full Order Details <FaArrowRight size={12} />
                    </Link>
                </motion.div>

                <div style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6B7280', fontSize: '14px' }}>
                        <FaTruck /> Fast Delivery
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6B7280', fontSize: '14px' }}>
                        <FaCheckCircle /> Secure Payment
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
