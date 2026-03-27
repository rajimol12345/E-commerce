import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaPaypal, FaChevronRight, FaChevronLeft, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Payment = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login?redirect=payment');
        } else if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [userInfo, shippingAddress, navigate]);

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '60px 20px' }}>
            <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>

                {/* Progress Steps */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '16px', color: '#9CA3AF', fontSize: '14px', fontWeight: '600' }}>
                    <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#059669', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
                        Shipping
                    </span>
                    <FaChevronRight size={12} style={{ marginTop: '4px', color: '#059669' }} />
                    <span style={{ color: '#003D29', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#003D29', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                        Payment
                    </span>
                    <FaChevronRight size={12} style={{ marginTop: '4px' }} />
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                        Review
                    </span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ backgroundColor: '#ECFDF5', padding: '12px', borderRadius: '12px' }}>
                            <FaCreditCard size={24} color="#003D29" />
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', margin: 0 }}>Payment Method</h1>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                            {/* PayPal Option */}
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '20px',
                                borderRadius: '16px',
                                border: `2px solid ${paymentMethod === 'PayPal' ? '#003D29' : '#F3F4F6'}`,
                                backgroundColor: paymentMethod === 'PayPal' ? '#F0FDF4' : 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ width: '20px', height: '20px', accentColor: '#003D29' }}
                                />
                                <div style={{ backgroundColor: '#003087', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FaPaypal color="white" size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', fontSize: '16px', color: '#111827' }}>PayPal or Credit Card</div>
                                    <div style={{ fontSize: '14px', color: '#6B7280' }}>Safe & secure payment via PayPal</div>
                                </div>
                            </label>

                            {/* Stripe Option (Placeholder) */}
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '20px',
                                borderRadius: '16px',
                                border: `2px solid ${paymentMethod === 'Stripe' ? '#003D29' : '#F3F4F6'}`,
                                backgroundColor: paymentMethod === 'Stripe' ? '#F0FDF4' : 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Stripe"
                                    checked={paymentMethod === 'Stripe'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ width: '20px', height: '20px', accentColor: '#003D29' }}
                                />
                                <div style={{ backgroundColor: '#635BFF', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FaCreditCard color="white" size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', fontSize: '16px', color: '#111827' }}>Stripe</div>
                                    <div style={{ fontSize: '14px', color: '#6B7280' }}>Pay with your debit or credit card</div>
                                </div>
                            </label>

                            {/* Cash on Delivery Option */}
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '20px',
                                borderRadius: '16px',
                                border: `2px solid ${paymentMethod === 'COD' ? '#003D29' : '#F3F4F6'}`,
                                backgroundColor: paymentMethod === 'COD' ? '#F0FDF4' : 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="Cash on Delivery"
                                    checked={paymentMethod === 'Cash on Delivery'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    style={{ width: '20px', height: '20px', accentColor: '#003D29' }}
                                />
                                <div style={{ backgroundColor: '#059669', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FaMoneyBillWave color="white" size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '700', fontSize: '16px', color: '#111827' }}>Cash on Delivery</div>
                                    <div style={{ fontSize: '14px', color: '#6B7280' }}>Pay with cash when your order is delivered</div>
                                </div>
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button
                                type="button"
                                onClick={() => navigate('/shipping')}
                                style={{
                                    flex: 1,
                                    padding: '18px',
                                    backgroundColor: 'white',
                                    color: '#374151',
                                    border: '1.5px solid #E5E7EB',
                                    borderRadius: '50px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <FaChevronLeft size={12} />
                                Back
                            </button>
                            <button
                                type="submit"
                                style={{
                                    flex: 2,
                                    padding: '18px',
                                    backgroundColor: '#003D29',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(0, 61, 41, 0.2)',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Continue to Review
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Payment;
