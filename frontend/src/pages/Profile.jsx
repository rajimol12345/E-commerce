import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { FaUser, FaShoppingBag, FaSignOutAlt, FaChevronRight, FaBoxOpen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'orders'
    const [orders, setOrders] = useState([]);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [loadingOrders, setLoadingOrders] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/users/profile');
                setUser(data);
                setName(data.name);
                setEmail(data.email);
            } catch (err) {
                console.error(err);
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
            const { data } = await api.get('/orders/myorders');
            setOrders(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab]);

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const { data } = await api.put('/users/profile', {
                name,
                email,
                password,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setUser(data);
            setMessage('Profile Updated Successfully');
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        }
    };

    if (!user) return null;

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '90vh', padding: '60px 20px' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827', marginBottom: '40px' }}>My Account</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px', alignItems: 'start' }}>

                    {/* Left Sidebar */}
                    <div style={{ backgroundColor: 'white', borderRadius: '32px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{
                                width: '80px', height: '80px',
                                backgroundColor: '#ECFDF5',
                                borderRadius: '50%',
                                margin: '0 auto 16px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '28px', color: '#059669',
                                fontWeight: '800',
                                border: '4px solid white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}>
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 4px 0' }}>{user.name}</h3>
                            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>{user.email}</p>
                        </div>

                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button
                                onClick={() => setActiveTab('profile')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: '16px 20px', borderRadius: '16px', border: 'none',
                                    backgroundColor: activeTab === 'profile' ? '#F0FDF4' : 'transparent',
                                    color: activeTab === 'profile' ? '#059669' : '#374151',
                                    fontWeight: '700', fontSize: '15px', cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FaUser /> Profile Settings
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: '16px 20px', borderRadius: '16px', border: 'none',
                                    backgroundColor: activeTab === 'orders' ? '#F0FDF4' : 'transparent',
                                    color: activeTab === 'orders' ? '#059669' : '#374151',
                                    fontWeight: '700', fontSize: '15px', cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FaShoppingBag /> Order History
                            </button>
                            <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '16px 0' }}></div>
                            <button
                                onClick={logoutHandler}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: '16px 20px', borderRadius: '16px', border: 'none',
                                    backgroundColor: 'transparent',
                                    color: '#DC2626',
                                    fontWeight: '700', fontSize: '15px', cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FaSignOutAlt /> Logout Account
                            </button>
                        </nav>
                    </div>

                    {/* Right Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' ? (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                style={{ backgroundColor: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                            >
                                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>Edit Profile Information</h2>

                                {message && <div style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '12px 20px', borderRadius: '12px', marginBottom: '24px', fontWeight: '600' }}>{message}</div>}
                                {error && <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '12px 20px', borderRadius: '12px', marginBottom: '24px', fontWeight: '600' }}>{error}</div>}

                                <form onSubmit={submitHandler}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Full Name</label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '15px', outline: 'none' }}
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Email Address</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '15px', outline: 'none' }}
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>New Password</label>
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '15px', outline: 'none' }}
                                                placeholder="••••••••"
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#374151' }}>Confirm New Password</label>
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1.5px solid #E5E7EB', fontSize: '15px', outline: 'none' }}
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        style={{
                                            padding: '16px 40px',
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
                                        Save Profile Changes
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="orders"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                style={{ backgroundColor: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                            >
                                <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '32px' }}>Your Order History</h2>

                                {loadingOrders ? (
                                    <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading orders...</div>
                                ) : orders.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                                        <FaBoxOpen size={48} color="#E5E7EB" style={{ marginBottom: '20px' }} />
                                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#374151' }}>No orders found</h3>
                                        <p style={{ color: '#6B7280' }}>You haven't placed any orders yet.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {orders.map((order) => (
                                            <div key={order._id} style={{
                                                padding: '24px',
                                                borderRadius: '20px',
                                                border: '1.5px solid #F3F4F6',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                transition: 'all 0.2s'
                                            }}
                                                onMouseOver={(e) => e.currentTarget.style.borderColor = '#003D29'}
                                                onMouseOut={(e) => e.currentTarget.style.borderColor = '#F3F4F6'}
                                            >
                                                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                                    <div style={{ backgroundColor: '#F9FAFB', padding: '12px', borderRadius: '12px' }}>
                                                        <FaShoppingBag color="#003D29" />
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '15px', color: '#6B7280', marginBottom: '2px' }}>Order ID: {order._id.substring(0, 10)}...</div>
                                                        <div style={{ fontSize: '16px', fontWeight: '800' }}>${order.totalPrice.toFixed(2)}</div>
                                                    </div>
                                                </div>

                                                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '24px' }}>
                                                    <div>
                                                        <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
                                                        <span style={{
                                                            padding: '4px 12px',
                                                            borderRadius: '50px',
                                                            fontSize: '12px',
                                                            fontWeight: '700',
                                                            backgroundColor: order.isPaid ? '#DCFCE7' : '#FEF3C7',
                                                            color: order.isPaid ? '#10633B' : '#92400E'
                                                        }}>
                                                            {order.isPaid ? 'Paid' : 'Pending Payment'}
                                                        </span>
                                                    </div>
                                                    <FaChevronRight color="#D1D5DB" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};

export default Profile;
