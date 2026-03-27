import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaShoppingBag, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

const Dashboard = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [navigate, userInfo]);

    if (!userInfo) return null;

    const stats = [
        { icon: <FaShoppingBag />, label: 'Orders', value: '12', color: '#003D29' },
        { icon: <FaHeart />, label: 'Wishlist', value: '8', color: '#FF6B6B' },
        { icon: <FaMapMarkerAlt />, label: 'Addresses', value: '2', color: '#4B3F6B' },
    ];

    return (
        <div style={{ padding: '80px 0', backgroundColor: '#F9FAFB', minHeight: 'calc(100vh - 160px)' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '40px', 
                        borderRadius: '24px', 
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        marginBottom: '40px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                            <div style={{ 
                                width: '80px', 
                                height: '80px', 
                                borderRadius: '50%', 
                                backgroundColor: '#E5E7EB',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '32px',
                                color: '#9CA3AF',
                                overflow: 'hidden'
                            }}>
                                {userInfo.image ? (
                                    <img src={userInfo.image.startsWith('http') ? userInfo.image : `https://e-commerce-jh2x.onrender.com${userInfo.image}`} alt={userInfo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <FaUser />
                                )}
                            </div>
                            <div>
                                <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#231F1E', marginBottom: '4px' }}>
                                    Welcome back, {userInfo.name}!
                                </h1>
                                <p style={{ color: '#5F6C72' }}>Manage your account, orders, and wishlist here.</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            {stats.map((stat, i) => (
                                <div key={i} style={{ 
                                    padding: '24px', 
                                    borderRadius: '16px', 
                                    backgroundColor: '#F9FAFB',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}>
                                    <div style={{ 
                                        fontSize: '24px', 
                                        color: stat.color, 
                                        marginBottom: '12px',
                                        backgroundColor: 'white',
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                                    }}>
                                        {stat.icon}
                                    </div>
                                    <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#231F1E' }}>{stat.value}</h3>
                                    <p style={{ color: '#5F6C72', fontSize: '14px' }}>{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <div style={{ 
                                padding: '30px', 
                                backgroundColor: 'white', 
                                borderRadius: '20px', 
                                border: '1px solid #E5E7EB',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#003D29'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,61,41,0.05)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#231F1E', marginBottom: '12px' }}>Edit Profile</h3>
                                <p style={{ color: '#5F6C72', fontSize: '14px', marginBottom: '20px' }}>Update your personal status and profile picture.</p>
                                <span style={{ color: '#003D29', fontWeight: '700', fontSize: '14px' }}>Go to Profile →</span>
                            </div>
                        </Link>

                        <Link to="/order/history" style={{ textDecoration: 'none' }}>
                             <div style={{ 
                                padding: '30px', 
                                backgroundColor: 'white', 
                                borderRadius: '20px', 
                                border: '1px solid #E5E7EB',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#003D29'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,61,41,0.05)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#231F1E', marginBottom: '12px' }}>Order History</h3>
                                <p style={{ color: '#5F6C72', fontSize: '14px', marginBottom: '20px' }}>Track your current orders and view past purchases.</p>
                                <span style={{ color: '#003D29', fontWeight: '700', fontSize: '14px' }}>View Orders →</span>
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
