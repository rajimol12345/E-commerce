import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Shipping = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const storedAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};

    const [address, setAddress] = useState(storedAddress.address || '');
    const [city, setCity] = useState(storedAddress.city || '');
    const [postalCode, setPostalCode] = useState(storedAddress.postalCode || '');
    const [country, setCountry] = useState(storedAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }));
        navigate('/payment');
    };

    if (!userInfo) {
        navigate('/login?redirect=shipping');
        return null; // Or generic loading
    }

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '60px 20px' }}>
            <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>

                {/* Progress Steps */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '16px', color: '#9CA3AF', fontSize: '14px', fontWeight: '600' }}>
                    <span style={{ color: '#003D29', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#003D29', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                        Shipping
                    </span>
                    <FaChevronRight size={12} style={{ marginTop: '4px' }} />
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
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
                    style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ backgroundColor: '#ECFDF5', padding: '12px', borderRadius: '12px' }}>
                            <FaTruck size={24} color="#003D29" />
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', margin: 0 }}>Shipping Address</h1>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Address</label>
                            <input
                                type="text"
                                placeholder="1234 Main St"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '16px', outline: 'none', backgroundColor: '#F9FAFB', transition: 'all 0.2s'
                                }}
                                onFocus={(e) => { e.target.style.borderColor = '#003D29'; e.target.style.backgroundColor = 'white'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.backgroundColor = '#F9FAFB'; }}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>City</label>
                            <input
                                type="text"
                                placeholder="New York"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                style={{
                                    width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '16px', outline: 'none', backgroundColor: '#F9FAFB', transition: 'all 0.2s'
                                }}
                                onFocus={(e) => { e.target.style.borderColor = '#003D29'; e.target.style.backgroundColor = 'white'; }}
                                onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.backgroundColor = '#F9FAFB'; }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Postal Code</label>
                                <input
                                    type="text"
                                    placeholder="10001"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '16px', outline: 'none', backgroundColor: '#F9FAFB', transition: 'all 0.2s'
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = '#003D29'; e.target.style.backgroundColor = 'white'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.backgroundColor = '#F9FAFB'; }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>Country</label>
                                <input
                                    type="text"
                                    placeholder="USA"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB', fontSize: '16px', outline: 'none', backgroundColor: '#F9FAFB', transition: 'all 0.2s'
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = '#003D29'; e.target.style.backgroundColor = 'white'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.backgroundColor = '#F9FAFB'; }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
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
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.01)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Continue to Payment
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Shipping;
