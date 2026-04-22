import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            navigate(redirect);
        }
    }, [navigate, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const { data } = await api.post('/users', { name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="login-container" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>

            {/* Left Side - Image */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="login-image-side"
                style={{
                    flex: '1'
                }}
            >
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80)', // Same consistent image or complementary
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 61, 41, 0.4)', // Dark green overlay
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '60px'
                    }}>
                        <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>
                            Join the Community
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', maxWidth: '400px' }}>
                            Create an account to unlock exclusive deals and personalized styling.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Right Side - Form */}
            <div style={{
                flex: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                padding: '40px',
                overflowY: 'auto' // Handle scrolling for smaller heights
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ width: '100%', maxWidth: '440px' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#231F1E', marginBottom: '8px' }}>Create Account</h1>
                        <p style={{ color: '#5F6C72' }}>Join Shopcart today and start shopping</p>
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: '#FEE2E2', color: '#DC2626',
                            padding: '12px', borderRadius: '12px', marginBottom: '24px',
                            textAlign: 'center', fontSize: '14px', fontWeight: '500'
                        }}>{error}</div>
                    )}

                    <form onSubmit={submitHandler}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#231F1E' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <FaUser style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px 16px 16px 50px',
                                        borderRadius: '50px', border: '1px solid #E5E7EB',
                                        fontSize: '16px', outline: 'none', transition: 'all 0.2s',
                                        backgroundColor: '#F9FAFB'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#003D29'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#231F1E' }}>Email</label>
                            <div style={{ position: 'relative' }}>
                                <FaEnvelope style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px 16px 16px 50px',
                                        borderRadius: '50px', border: '1px solid #E5E7EB',
                                        fontSize: '16px', outline: 'none', transition: 'all 0.2s',
                                        backgroundColor: '#F9FAFB'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#003D29'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#231F1E' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px 16px 16px 50px',
                                        borderRadius: '50px', border: '1px solid #E5E7EB',
                                        fontSize: '16px', outline: 'none', transition: 'all 0.2s',
                                        backgroundColor: '#F9FAFB'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#003D29'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#231F1E' }}>Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <FaLock style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    style={{
                                        width: '100%', padding: '16px 16px 16px 50px',
                                        borderRadius: '50px', border: '1px solid #E5E7EB',
                                        fontSize: '16px', outline: 'none', transition: 'all 0.2s',
                                        backgroundColor: '#F9FAFB'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#003D29'}
                                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%', padding: '16px',
                                backgroundColor: '#003D29', color: 'white',
                                borderRadius: '50px', fontSize: '16px', fontWeight: '700',
                                border: 'none', cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0, 61, 41, 0.2)',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Create Account
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '32px', color: '#5F6C72' }}>
                        Already have an account? {' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ color: '#003D29', fontWeight: '700', textDecoration: 'none' }}>
                            Sign In
                        </Link>
                    </p>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .desktop-only-image {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Register;
