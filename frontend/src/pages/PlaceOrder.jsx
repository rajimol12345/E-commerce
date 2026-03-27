import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { FaMapMarkerAlt, FaCreditCard, FaShoppingBag, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { cartItems: contextCartItems, clearCart, fetchCart } = useCart();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=placeorder');
        } else if (!shippingAddress) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        } else {
            setCartItems(contextCartItems);
        }
    }, [userInfo, shippingAddress, paymentMethod, navigate, contextCartItems]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const shippingPrice = subtotal > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * subtotal).toFixed(2));
    const totalPrice = (Number(subtotal) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    const placeOrderHandler = async () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    ...item,
                    product: item.product // Ensure product ID is passed
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice: subtotal,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const { data } = await api.post('/orders', orderData);
            await clearCart(); // Use global clear cart which updates badge

            alert('Order Placed Successfully!');
            navigate(`/order/${data._id}`);
        } catch (error) {
            alert('Order failed: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '60px 20px' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>

                {/* Progress Steps */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '16px', color: '#9CA3AF', fontSize: '14px', fontWeight: '600' }}>
                    <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                        Shipping
                    </span>
                    <FaChevronRight size={12} style={{ marginTop: '4px', color: '#059669' }} />
                    <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                        Payment
                    </span>
                    <FaChevronRight size={12} style={{ marginTop: '4px', color: '#059669' }} />
                    <span style={{ color: '#003D29', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#003D29', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                        Review
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>

                    {/* Left Column: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                    >
                        {/* Shipping Info Card */}
                        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <FaMapMarkerAlt color="#003D29" size={20} />
                                <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Shipping Address</h2>
                            </div>
                            <p style={{ margin: 0, color: '#374151', lineHeight: '1.6' }}>
                                <strong>{userInfo?.name}</strong><br />
                                {shippingAddress?.address}<br />
                                {shippingAddress?.city}, {shippingAddress?.postalCode}<br />
                                {shippingAddress?.country}
                            </p>
                        </div>

                        {/* Payment Info Card */}
                        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <FaCreditCard color="#003D29" size={20} />
                                <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Payment Method</h2>
                            </div>
                            <p style={{ margin: 0, color: '#374151' }}>
                                <strong>Method: </strong> {paymentMethod}
                            </p>
                        </div>

                        {/* Order Items Card */}
                        <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <FaShoppingBag color="#003D29" size={20} />
                                <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Review Items</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {cartItems.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: index !== cartItems.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                                        <div style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#F9FAFB', flexShrink: 0 }}>
                                            <img
                                                src={item.image?.startsWith('http') ? item.image : `https://e-commerce-jh2x.onrender.com${item.image}`}
                                                alt={item.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '700', fontSize: '15px' }}>{item.name}</div>
                                            <div style={{ fontSize: '13px', color: '#6B7280' }}>Qty: {item.qty}</div>
                                        </div>
                                        <div style={{ fontWeight: '700', color: '#003D29' }}>
                                            ${(item.qty * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Order Summary */}
                    <div style={{ height: 'fit-content' }}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ backgroundColor: 'white', padding: '32px', borderRadius: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', position: 'sticky', top: '100px' }}
                        >
                            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', color: '#111827' }}>Order Summary</h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                                    <span>Items Subtotal</span>
                                    <span style={{ fontWeight: '600', color: '#111827' }}>${subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                                    <span>Shipping</span>
                                    <span style={{ fontWeight: '600', color: '#111827' }}>${shippingPrice.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B7280' }}>
                                    <span>Estimated Tax</span>
                                    <span style={{ fontWeight: '600', color: '#111827' }}>${taxPrice}</span>
                                </div>
                            </div>

                            <div style={{ height: '1px', backgroundColor: '#F3F4F6', marginBottom: '24px' }}></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                                <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827' }}>Total Amount</span>
                                <span style={{ fontSize: '26px', fontWeight: '800', color: '#003D29' }}>${totalPrice}</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <button
                                    onClick={placeOrderHandler}
                                    disabled={loading}
                                    style={{
                                        width: '100%',
                                        padding: '18px',
                                        backgroundColor: '#003D29',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50px',
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        boxShadow: '0 4px 12px rgba(0, 61, 41, 0.2)',
                                        transition: 'all 0.2s',
                                        opacity: loading ? 0.7 : 1
                                    }}
                                >
                                    {loading ? 'Processing...' : 'Place Order Now'}
                                </button>
                                <button
                                    onClick={() => navigate('/payment')}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        backgroundColor: 'white',
                                        color: '#374151',
                                        border: '1.5px solid #E5E7EB',
                                        borderRadius: '50px',
                                        fontSize: '15px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    <FaChevronLeft size={10} />
                                    Change Payment
                                </button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
